/* ==========================================================================
   MINDPAL NEXT-GEN DASHBOARD - INTERACTIVE SCRIPT (mindpal-app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 MindPal Studio Dashboard Initialized.');

  // DOM Elements
  const btnRunWorkflow = document.getElementById('btnRunWorkflow');
  const btnPauseWorkflow = document.getElementById('btnPauseWorkflow');
  const wfStatusText = document.getElementById('wfStatusText');
  const logsContainer = document.getElementById('logsContainer');
  const clearLogsBtn = document.getElementById('clearLogsBtn');

  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const openMindieDrawer = document.getElementById('openMindieDrawer');
  const drawerTitle = document.getElementById('drawerTitle');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const sendChatBtn = document.getElementById('sendChatBtn');

  const triggerSearchModal = document.getElementById('triggerSearchModal');
  const cmdModalBackdrop = document.getElementById('cmdModalBackdrop');
  const cmdSearchInput = document.getElementById('cmdSearchInput');

  const dropzone = document.getElementById('dropzone');
  const kbList = document.getElementById('kbList');
  const toastContainer = document.getElementById('toastContainer');

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleIcon = document.getElementById('themeToggleIcon');

  const sidebar = document.getElementById('sidebar');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const brandLogoBtn = document.getElementById('brandLogoBtn');

  let currentActiveAgent = 'Mindie Assistant';

  /* ==========================================================================
     0. SIDEBAR COLLAPSE / EXPAND LOGIC
     ========================================================================== */
  function toggleSidebar(forceState) {
    if (!sidebar) return;
    const isCollapsed = forceState !== undefined ? forceState : sidebar.classList.toggle('collapsed');
    if (forceState !== undefined) {
      sidebar.classList.toggle('collapsed', isCollapsed);
    }
    localStorage.setItem('mindpal-sidebar-collapsed', isCollapsed ? 'true' : 'false');
    showToast(isCollapsed ? 'Sidebar Collapsed (72px)' : 'Sidebar Expanded (260px)', 'info', 'ph-sidebar-simple');
    appendLog('UI', `Sidebar state: ${isCollapsed ? 'COLLAPSED' : 'EXPANDED'}`, 'info');
  }

  const savedSidebarState = localStorage.getItem('mindpal-sidebar-collapsed') === 'true';
  if (savedSidebarState && sidebar) {
    sidebar.classList.add('collapsed');
  }

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSidebar(true); // Collapse sidebar
    });
  }

  if (brandLogoBtn) {
    brandLogoBtn.addEventListener('click', () => {
      if (sidebar && sidebar.classList.contains('collapsed')) {
        toggleSidebar(false); // Expand sidebar when logo clicked
      }
    });
  }

  /* ==========================================================================
     0.0 WORKSPACE SWITCHER & CREATOR LOGIC
     ========================================================================== */
  const sidebarWsCard = document.getElementById('sidebarWsCard');
  const wsDropdownMenu = document.getElementById('wsDropdownMenu');
  const currentWsName = document.getElementById('currentWsName');
  const currentWsDesc = document.getElementById('currentWsDesc');
  const wsListContainer = document.getElementById('wsListContainer');

  const createWsModalBackdrop = document.getElementById('createWsModalBackdrop');
  const btnOpenCreateWsModal = document.getElementById('btnOpenCreateWsModal');
  const btnCreateWsMini = document.getElementById('btnCreateWsMini');
  const closeCreateWsModalBtn = document.getElementById('closeCreateWsModalBtn');
  const cancelCreateWsBtn = document.getElementById('cancelCreateWsBtn');
  const createWsForm = document.getElementById('createWsForm');

  if (sidebarWsCard && wsDropdownMenu) {
    sidebarWsCard.addEventListener('click', (e) => {
      // Don't toggle dropdown if clicked inside dropdown
      if (e.target.closest('#wsDropdownMenu')) return;
      e.stopPropagation();

      // Expand sidebar if collapsed
      if (sidebar && sidebar.classList.contains('collapsed')) {
        toggleSidebar(false);
      }

      wsDropdownMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (sidebarWsCard && !sidebarWsCard.contains(e.target)) {
        wsDropdownMenu.classList.remove('open');
      }
    });

    // Workspace Item Switching Listener
    function attachWsItemListeners() {
      document.querySelectorAll('.ws-item').forEach(item => {
        item.onclick = (e) => {
          e.stopPropagation();
          document.querySelectorAll('.ws-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');

          const name = item.getAttribute('data-name');
          const desc = item.getAttribute('data-desc');
          const mainWsScopeTitle = document.getElementById('mainWsScopeTitle');

          if (currentWsName) currentWsName.textContent = name;
          if (currentWsDesc) currentWsDesc.textContent = desc;
          if (mainWsScopeTitle) mainWsScopeTitle.textContent = name;

          wsDropdownMenu.classList.remove('open');
          showToast(`Switched Workspace to: ${name}`, 'success', 'ph-buildings');
          appendLog('WORKSPACE', `Switched active workspace cluster to [${name}].`, 'info');
        };
      });
    }
    attachWsItemListeners();

    // Open/Close Create Workspace Modal
    function openCreateWsModal() {
      wsDropdownMenu.classList.remove('open');
      if (createWsModalBackdrop) createWsModalBackdrop.classList.add('open');
    }

    function closeCreateWsModal() {
      if (createWsModalBackdrop) createWsModalBackdrop.classList.remove('open');
    }

    if (btnOpenCreateWsModal) btnOpenCreateWsModal.addEventListener('click', (e) => { e.stopPropagation(); openCreateWsModal(); });
    if (btnCreateWsMini) btnCreateWsMini.addEventListener('click', (e) => { e.stopPropagation(); openCreateWsModal(); });
    if (closeCreateWsModalBtn) closeCreateWsModalBtn.addEventListener('click', closeCreateWsModal);
    if (cancelCreateWsBtn) cancelCreateWsBtn.addEventListener('click', closeCreateWsModal);

    if (createWsModalBackdrop) {
      createWsModalBackdrop.addEventListener('click', (e) => {
        if (e.target === createWsModalBackdrop) closeCreateWsModal();
      });
    }

    // Submit New Workspace Form
    if (createWsForm) {
      createWsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const wsName = document.getElementById('newWsNameInput')?.value.trim();
        const wsDesc = document.getElementById('newWsDescInput')?.value.trim() || 'Custom Workspace';
        const wsPlan = document.getElementById('newWsPlanInput')?.value || 'Pro • 6 Agents';

        if (!wsName) return;

        // Create new item in list
        const newItem = document.createElement('div');
        newItem.className = 'ws-item active';
        newItem.setAttribute('data-name', wsName);
        newItem.setAttribute('data-desc', `${wsPlan}`);
        newItem.setAttribute('data-icon', 'ph-buildings');
        newItem.innerHTML = `
          <div class="ws-item-icon rd"><i class="ph-bold ph-buildings"></i></div>
          <div class="ws-item-info">
            <span class="ws-item-title">${wsName}</span>
            <span class="ws-item-sub">${wsDesc}</span>
          </div>
          <i class="ph-bold ph-check ws-check-icon"></i>
        `;

        document.querySelectorAll('.ws-item').forEach(i => i.classList.remove('active'));
        wsListContainer?.prepend(newItem);
        attachWsItemListeners();

        // Switch to new workspace
        const mainWsScopeTitle = document.getElementById('mainWsScopeTitle');
        if (currentWsName) currentWsName.textContent = wsName;
        if (currentWsDesc) currentWsDesc.textContent = wsPlan;
        if (mainWsScopeTitle) mainWsScopeTitle.textContent = wsName;

        closeCreateWsModal();
        createWsForm.reset();

        showToast(`Created & Switched to Workspace: ${wsName}`, 'success', 'ph-plus-circle');
        appendLog('WORKSPACE', `Created new workspace cluster: [${wsName}] (${wsPlan}).`, 'success');
      });
    }
  }

  /* ==========================================================================
     0.0.1 COMPACT PROJECT SELECTOR DROPDOWN LOGIC
     ========================================================================== */
  const projectSelectBtn = document.getElementById('projectSelectBtn');
  const projectDropdownMenu = document.getElementById('projectDropdownMenu');
  const selectedProjectLabel = document.getElementById('selectedProjectLabel');

  const btnOpenNewProjectModal = document.getElementById('btnOpenNewProjectModal');
  const createProjectModalBackdrop = document.getElementById('createProjectModalBackdrop');
  const closeCreateProjectModalBtn = document.getElementById('closeCreateProjectModalBtn');
  const cancelCreateProjectBtn = document.getElementById('cancelCreateProjectBtn');
  const createProjectForm = document.getElementById('createProjectForm');

  if (projectSelectBtn && projectDropdownMenu) {
    projectSelectBtn.addEventListener('click', (e) => {
      if (e.target.closest('#projectDropdownMenu')) return;
      e.stopPropagation();
      projectDropdownMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (projectSelectBtn && !projectSelectBtn.contains(e.target)) {
        projectDropdownMenu.classList.remove('open');
      }
    });

    function attachProjectSelectListeners() {
      document.querySelectorAll('.proj-item').forEach(item => {
        item.onclick = (e) => {
          e.stopPropagation();
          document.querySelectorAll('.proj-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');

          const filter = item.getAttribute('data-project');
          const label = item.getAttribute('data-label') || item.querySelector('span')?.textContent;

          if (selectedProjectLabel) selectedProjectLabel.textContent = label;

          const cards = document.querySelectorAll('#agentsCardsGrid .agent-card');
          let visibleCount = 0;
          cards.forEach(card => {
            const cardProject = card.getAttribute('data-project');
            if (filter === 'all' || cardProject === filter) {
              card.style.display = 'flex';
              visibleCount++;
            } else {
              card.style.display = 'none';
            }
          });

          projectDropdownMenu.classList.remove('open');
          showToast(`Filtered ${visibleCount} Agent(s) in Project`, 'info', 'ph-folder');
          appendLog('PROJECT', `Filtered Agents view by project: [${filter}].`, 'info');
        };
      });
    }
    attachProjectSelectListeners();

    function openCreateProjectModal() {
      projectDropdownMenu.classList.remove('open');
      if (createProjectModalBackdrop) createProjectModalBackdrop.classList.add('open');
    }

    function closeCreateProjectModal() {
      if (createProjectModalBackdrop) createProjectModalBackdrop.classList.remove('open');
    }

    if (btnOpenNewProjectModal) btnOpenNewProjectModal.addEventListener('click', (e) => { e.stopPropagation(); openCreateProjectModal(); });
    if (closeCreateProjectModalBtn) closeCreateProjectModalBtn.addEventListener('click', closeCreateProjectModal);
    if (cancelCreateProjectBtn) cancelCreateProjectBtn.addEventListener('click', closeCreateProjectModal);

    if (createProjectModalBackdrop) {
      createProjectModalBackdrop.addEventListener('click', (e) => {
        if (e.target === createProjectModalBackdrop) closeCreateProjectModal();
      });
    }

    if (createProjectForm) {
      createProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const projName = document.getElementById('newProjectNameInput')?.value.trim();
        if (!projName) return;

        const slug = projName.toLowerCase().replace(/[^a-z0-9]/g, '');

        // Create new item in dropdown
        const newItem = document.createElement('div');
        newItem.className = 'proj-item active';
        newItem.setAttribute('data-project', slug);
        newItem.setAttribute('data-label', `${projName} (0)`);
        newItem.innerHTML = `
          <i class="ph-bold ph-folder" style="color: var(--accent-violet);"></i>
          <span>${projName}</span>
          <span class="proj-count">0</span>
        `;

        document.querySelectorAll('.proj-item').forEach(i => i.classList.remove('active'));
        const divider = projectDropdownMenu.querySelector('.proj-dropdown-divider');
        if (divider) {
          projectDropdownMenu.insertBefore(newItem, divider);
        } else {
          projectDropdownMenu.appendChild(newItem);
        }

        attachProjectSelectListeners();
        if (selectedProjectLabel) selectedProjectLabel.textContent = `${projName} (0)`;

        // Filter cards for new empty project
        document.querySelectorAll('#agentsCardsGrid .agent-card').forEach(card => card.style.display = 'none');

        closeCreateProjectModal();
        createProjectForm.reset();

        showToast(`Created Project Group: ${projName}`, 'success', 'ph-folder-plus');
        appendLog('PROJECT', `Created new Agent Project Group: [${projName}].`, 'success');
      });
    }
  }

  /* ==========================================================================
     0.0.2 CREATE AGENT WIZARD MODAL LOGIC (3 MODES)
     ========================================================================== */
  const createAgentWizardModalBackdrop = document.getElementById('createAgentWizardModalBackdrop');
  const agentWizardStepMode = document.getElementById('agentWizardStepMode');
  const agentWizardStepTemplate = document.getElementById('agentWizardStepTemplate');
  const agentWizardStepBlank = document.getElementById('agentWizardStepBlank');

  const closeCreateAgentModalBtn = document.getElementById('closeCreateAgentModalBtn');
  const closeTemplateStepBtn = document.getElementById('closeTemplateStepBtn');
  const closeBlankStepBtn = document.getElementById('closeBlankStepBtn');

  const backToModesFromTemplate = document.getElementById('backToModesFromTemplate');
  const backToModesFromBlank = document.getElementById('backToModesFromBlank');
  const cancelBlankAgentBtn = document.getElementById('cancelBlankAgentBtn');

  const modeChatAI = document.getElementById('modeChatAI');
  const modeTemplate = document.getElementById('modeTemplate');
  const modeBlank = document.getElementById('modeBlank');
  const blankAgentForm = document.getElementById('blankAgentForm');

  function openAgentWizardModal() {
    if (!createAgentWizardModalBackdrop) return;
    if (agentWizardStepMode) agentWizardStepMode.style.display = 'block';
    if (agentWizardStepTemplate) agentWizardStepTemplate.style.display = 'none';
    if (agentWizardStepBlank) agentWizardStepBlank.style.display = 'none';
    createAgentWizardModalBackdrop.classList.add('open');
  }

  function closeAgentWizardModal() {
    if (createAgentWizardModalBackdrop) createAgentWizardModalBackdrop.classList.remove('open');
  }

  // Trigger from all Create Agent buttons
  document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent.includes('Create Agent') || btn.id === 'btnNewAgent') {
      btn.onclick = (e) => {
        e.stopPropagation();
        openAgentWizardModal();
      };
    }
  });

  if (closeCreateAgentModalBtn) closeCreateAgentModalBtn.onclick = closeAgentWizardModal;
  if (closeTemplateStepBtn) closeTemplateStepBtn.onclick = closeAgentWizardModal;
  if (closeBlankStepBtn) closeBlankStepBtn.onclick = closeAgentWizardModal;
  if (cancelBlankAgentBtn) cancelBlankAgentBtn.onclick = closeAgentWizardModal;

  if (backToModesFromTemplate) {
    backToModesFromTemplate.onclick = () => {
      agentWizardStepTemplate.style.display = 'none';
      agentWizardStepMode.style.display = 'block';
    };
  }

  if (backToModesFromBlank) {
    backToModesFromBlank.onclick = () => {
      agentWizardStepBlank.style.display = 'none';
      agentWizardStepMode.style.display = 'block';
    };
  }

  if (createAgentWizardModalBackdrop) {
    createAgentWizardModalBackdrop.onclick = (e) => {
      if (e.target === createAgentWizardModalBackdrop) closeAgentWizardModal();
    };
  }

  // MODE 1: CHAT WITH AI CO-PILOT
  if (modeChatAI) {
    modeChatAI.onclick = () => {
      closeAgentWizardModal();
      const assistantDrawer = document.getElementById('assistantDrawer');
      if (assistantDrawer) assistantDrawer.classList.add('open');
      showToast('Opened Mindie AI Co-Pilot Chat', 'info', 'ph-sparkle');
      appendLog('ASSISTANT', 'Initiated AI Co-Pilot Chat Agent Creation flow.', 'info');
    };
  }

  // MODE 2: CHOOSE FROM TEMPLATE
  if (modeTemplate) {
    modeTemplate.onclick = () => {
      if (agentWizardStepMode) agentWizardStepMode.style.display = 'none';
      if (agentWizardStepTemplate) agentWizardStepTemplate.style.display = 'block';
    };
  }

  document.querySelectorAll('.template-item[data-template]').forEach(item => {
    item.onclick = () => {
      const tmpl = item.getAttribute('data-template');
      const tmplName = item.querySelector('.tmpl-name')?.textContent || 'Template Agent';
      const tmplDesc = item.querySelector('.tmpl-desc')?.textContent || 'Custom Template Role';

      const grid = document.getElementById('agentsCardsGrid');
      if (grid) {
        const newCard = document.createElement('div');
        newCard.className = 'agent-card';
        newCard.setAttribute('data-project', tmpl === 'research' || tmpl === 'analyst' ? 'market' : (tmpl === 'writer' ? 'content' : 'engineering'));
        newCard.innerHTML = `
          <div class="agent-card-header">
            <div class="agent-avatar ${tmpl}"><i class="ph-bold ph-robot"></i></div>
            <div class="agent-meta">
              <span class="agent-name">${tmplName}</span>
              <span class="agent-role">${tmplDesc}</span>
            </div>
          </div>
          <div class="agent-tags">
            <span class="tag project-tag"><i class="ph-bold ph-folder"></i> Template Project</span>
            <span class="tag model-tag">GPT-4o</span>
            <span class="tag brand-tag">Template Config</span>
          </div>
          <div class="agent-footer">
            <span class="agent-status-toggle"><span class="toggle-dot"></span> Active</span>
            <button class="btn-sm-text test-agent-btn" data-agent="${tmplName}">Test Chat &rarr;</button>
          </div>
        `;
        grid.prepend(newCard);
      }

      closeAgentWizardModal();
      showToast(`Created Agent from Template: ${tmplName}`, 'success', 'ph-layout');
      appendLog('AGENT', `Created new Agent [${tmplName}] from pre-built template.`, 'success');
    };
  });

  // MODE 3: BUILD BLANK AGENT FROM SCRATCH
  if (modeBlank) {
    modeBlank.onclick = () => {
      if (agentWizardStepMode) agentWizardStepMode.style.display = 'none';
      if (agentWizardStepBlank) agentWizardStepBlank.style.display = 'block';
    };
  }

  if (blankAgentForm) {
    blankAgentForm.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('blankAgentName')?.value.trim();
      const role = document.getElementById('blankAgentRole')?.value.trim();
      const project = document.getElementById('blankAgentProject')?.value || 'engineering';
      const model = document.getElementById('blankAgentModel')?.value || 'Claude 3.5 Sonnet';
      const prompt = document.getElementById('blankAgentPrompt')?.value.trim();
      const output = document.getElementById('blankAgentOutput')?.value || 'Structured JSON';
      const tools = document.getElementById('blankAgentTools')?.value.trim() || 'Custom Tools';

      if (!name || !role) return;

      const grid = document.getElementById('agentsCardsGrid');
      if (grid) {
        const newCard = document.createElement('div');
        newCard.className = 'agent-card';
        newCard.setAttribute('data-project', project);
        newCard.innerHTML = `
          <div class="agent-card-header">
            <div class="agent-avatar coder"><i class="ph-bold ph-robot"></i></div>
            <div class="agent-meta">
              <span class="agent-name">${name}</span>
              <span class="agent-role">${role}</span>
            </div>
          </div>
          <div class="agent-tags">
            <span class="tag project-tag"><i class="ph-bold ph-folder"></i> ${project.toUpperCase()}</span>
            <span class="tag model-tag">${model}</span>
            <span class="tag composio-tag">${tools}</span>
          </div>
          <div class="agent-footer">
            <span class="agent-status-toggle"><span class="toggle-dot"></span> Active</span>
            <button class="btn-sm-text test-agent-btn" data-agent="${name}">Test Chat &rarr;</button>
          </div>
        `;
        grid.prepend(newCard);
      }

      closeAgentWizardModal();
      blankAgentForm.reset();
      showToast(`Created Custom Agent: ${name}`, 'success', 'ph-sparkle');
      appendLog('AGENT', `Created custom blank agent [${name}] (${model}, ${output}).`, 'success');
    };
  }
  /* ==========================================================================
     0.0.3 UPGRADE PLAN MODAL INTERACTIVITY
     ========================================================================== */
  const upgradeModalBackdrop = document.getElementById('upgradeModalBackdrop');
  const sidebarUpgradeBtn = document.getElementById('sidebarUpgradeBtn');
  const closeUpgradeModalBtn = document.getElementById('closeUpgradeModalBtn');
  const btnConfirmEnterpriseUpgrade = document.getElementById('btnConfirmEnterpriseUpgrade');
  const userCurrentPlanTag = document.getElementById('userCurrentPlanTag');

  function openUpgradeModal() {
    if (userMenuDropdown) userMenuDropdown.classList.remove('open');
    if (upgradeModalBackdrop) upgradeModalBackdrop.classList.add('open');
  }

  function closeUpgradeModal() {
    if (upgradeModalBackdrop) upgradeModalBackdrop.classList.remove('open');
  }

  if (sidebarUpgradeBtn) {
    sidebarUpgradeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openUpgradeModal();
    });
  }

  if (closeUpgradeModalBtn) closeUpgradeModalBtn.onclick = closeUpgradeModal;

  if (upgradeModalBackdrop) {
    upgradeModalBackdrop.onclick = (e) => {
      if (e.target === upgradeModalBackdrop) closeUpgradeModal();
    };
  }

  if (btnConfirmEnterpriseUpgrade) {
    btnConfirmEnterpriseUpgrade.onclick = () => {
      if (userCurrentPlanTag) userCurrentPlanTag.textContent = 'Enterprise Plan';
      closeUpgradeModal();
      showToast('Successfully Upgraded to Enterprise Plan!', 'success', 'ph-rocket-launch');
      appendLog('ACCOUNT', 'Upgraded workspace plan tier to Enterprise ($99/mo).', 'success');
    };
  }

  /* ==========================================================================
     0.0.4 RECENT CHATS BY PROJECT GROUP LOGIC
     ========================================================================== */
  function attachChatHistoryListeners() {
    document.querySelectorAll('.chat-proj-header').forEach(header => {
      header.onclick = (e) => {
        e.stopPropagation();
        const group = header.closest('.chat-proj-group');
        if (group) group.classList.toggle('collapsed');
      };
    });

    document.querySelectorAll('.chat-item[data-chat-id]').forEach(item => {
      item.onclick = (e) => {
        e.stopPropagation();
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const title = item.querySelector('.chat-title')?.textContent || item.getAttribute('title');
        const assistantDrawer = document.getElementById('assistantDrawer');
        if (assistantDrawer) assistantDrawer.classList.add('open');

        showToast(`Loaded Chat Thread: "${title}"`, 'info', 'ph-chat-circle-text');
        appendLog('CHAT', `Loaded chat conversation thread: [${title}].`, 'info');
      };
    });
  }
  attachChatHistoryListeners();

  /* ==========================================================================
     0.0.5 DEPLOYED WORKFLOWS HANDLERS
     ========================================================================== */
  document.querySelectorAll('.btn-run-wf').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const wfId = btn.getAttribute('data-wf-id');
      showToast(`Running Workflow ${wfId} in background...`, 'success', 'ph-play');
      appendLog('WORKFLOW', `Manually triggered background execution for [${wfId}].`, 'success');
    };
  });

  const btnDeployNewWf = document.getElementById('btnDeployNewWf');
  if (btnDeployNewWf) {
    btnDeployNewWf.onclick = () => {
      const wfTab = document.querySelector('.nav-item[data-tab="workflows"]');
      if (wfTab) wfTab.click();
      showToast('Opening Workflow Builder...', 'info', 'ph-tree-structure');
    };
  }

  const btnDeployNewAgent = document.getElementById('btnDeployNewAgent');
  if (btnDeployNewAgent) {
    btnDeployNewAgent.onclick = () => {
      const agentsTab = document.querySelector('.nav-item[data-tab="agents"]');
      if (agentsTab) agentsTab.click();
      showToast('Navigating to AI Agents Studio...', 'info', 'ph-robot');
    };
  }

  /* ==========================================================================
     0.1 USER PROFILE POPUP MENU DROPDOWN
     ========================================================================== */
  const userProfileBtn = document.getElementById('userProfileBtn');
  const userMenuDropdown = document.getElementById('userMenuDropdown');

  if (userProfileBtn && userMenuDropdown) {
    userProfileBtn.addEventListener('click', (e) => {
      // Don't trigger if clicked on theme mini button inside user profile
      if (e.target.closest('#themeToggleBtn')) return;
      e.stopPropagation();
      userMenuDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!userProfileBtn.contains(e.target)) {
        userMenuDropdown.classList.remove('open');
      }
    });

    document.getElementById('userMenuUpgrade')?.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenuDropdown.classList.remove('open');
      openUpgradeModal();
    });

    document.getElementById('userMenuSettings')?.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenuDropdown.classList.remove('open');
      document.querySelector('.sidebar-nav .nav-item[data-tab="settings"]')?.click();
      showToast('Opened Account Settings', 'info', 'ph-gear');
    });

    document.getElementById('userMenuBilling')?.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenuDropdown.classList.remove('open');
      showToast('Billing Portal: 84,500 Tokens remaining.', 'info', 'ph-credit-card');
      appendLog('BILLING', 'User accessed token usage portal.', 'info');
    });

    document.getElementById('userMenuTeam')?.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenuDropdown.classList.remove('open');
      showToast('Team Members (4 Seats Active)', 'info', 'ph-users');
    });

    document.getElementById('userMenuLogout')?.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenuDropdown.classList.remove('open');
      showToast('Logging out of MindPal Studio...', 'warn', 'ph-sign-out');
      appendLog('AUTH', 'User initiated logout procedure.', 'warn');
    });
  }

  /* ==========================================================================
     0.1 THEME SWITCHER LOGIC (DARK / LIGHT MODE)
     ========================================================================== */
  function updateThemeUI(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mindpal-theme', theme);
    localStorage.setItem('theme', theme);
    const themeLabel = document.querySelector('.theme-toggle-label');
    if (themeToggleIcon) {
      themeToggleIcon.className = theme === 'dark' ? 'ph-bold ph-sun' : 'ph-bold ph-moon';
      themeToggleBtn?.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
    }
    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? 'Theme: Dark Mode' : 'Theme: Light Mode';
    }
  }

  const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeUI(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      updateThemeUI(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} Mode`, 'info', newTheme === 'dark' ? 'ph-moon' : 'ph-sun');
      appendLog('SYSTEM', `Theme mode changed to: ${newTheme.toUpperCase()}`, 'info');
    });
  }

  /* ==========================================================================
     1. TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  function showToast(message, type = 'info', icon = 'ph-check-circle') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="ph-bold ${icon}" style="font-size: 1.1rem; color: var(--accent-cyan);"></i>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* ==========================================================================
     2. LOGGING CONSOLE UTILITY
     ========================================================================== */
  function appendLog(type, msg, badgeClass = 'info') {
    const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    const logLine = document.createElement('div');
    logLine.className = 'log-line';
    logLine.innerHTML = `
      <span class="log-time">[${timeStr}]</span>
      <span class="log-type ${badgeClass}">[${type}]</span>
      <span class="log-msg">${msg}</span>
    `;
    logsContainer.appendChild(logLine);
    logsContainer.scrollTop = logsContainer.scrollHeight;
  }

  if (clearLogsBtn) {
    clearLogsBtn.addEventListener('click', () => {
      logsContainer.innerHTML = '';
      appendLog('SYSTEM', 'Console cleared.', 'info');
    });
  }

  /* ==========================================================================
     3. WORKFLOW ASSEMBLY LINE SIMULATOR
     ========================================================================== */
  let isWorkflowRunning = false;
  let workflowTimeouts = [];

  function resetWorkflowUI() {
    workflowTimeouts.forEach(t => clearTimeout(t));
    workflowTimeouts = [];
    isWorkflowRunning = false;

    for (let i = 1; i <= 5; i++) {
      const node = document.getElementById(`node${i}`);
      if (node) {
        node.className = 'wf-node';
        const badge = node.querySelector('.node-status-badge');
        if (badge) {
          badge.className = 'node-status-badge idle';
          badge.textContent = 'Idle';
        }
      }
      const line = document.getElementById(`line${i}`);
      if (line) line.className = 'node-connector-line';
    }
    wfStatusText.textContent = 'SYSTEM READY • WAITING FOR TRIGGER';
  }

  if (btnRunWorkflow) {
    btnRunWorkflow.addEventListener('click', () => {
      if (isWorkflowRunning) return;
      isWorkflowRunning = true;
      resetWorkflowUI();

      showToast('Multi-Agent Workflow Started!', 'info', 'ph-play');
      wfStatusText.textContent = 'EXECUTING MULTI-AGENT WORKFLOW...';
      appendLog('WORKFLOW', 'Starting Pipeline #WF-8890 execution.', 'info');

      // Step 1: Agent Node
      const t1 = setTimeout(() => {
        const node1 = document.getElementById('node1');
        node1.className = 'wf-node active';
        node1.querySelector('.node-status-badge').className = 'node-status-badge running';
        node1.querySelector('.node-status-badge').textContent = 'Running';
        appendLog('AGENT:Researcher', 'Executing Agent Node (GPT-4o + Composio Web Tools)...', 'agent');
      }, 300);

      // Step 1 Done & Line 1 Active
      const t2 = setTimeout(() => {
        const node1 = document.getElementById('node1');
        node1.className = 'wf-node completed';
        node1.querySelector('.node-status-badge').className = 'node-status-badge done';
        node1.querySelector('.node-status-badge').textContent = 'Done';
        document.getElementById('line1').className = 'node-connector-line active';
        appendLog('SUCCESS', 'Agent Node complete. Extracted 12 market insights.', 'success');
      }, 1800);

      // Step 2: Router Node
      const t3 = setTimeout(() => {
        const node2 = document.getElementById('node2');
        node2.className = 'wf-node active';
        node2.querySelector('.node-status-badge').className = 'node-status-badge running';
        node2.querySelector('.node-status-badge').textContent = 'Routing';
        appendLog('ROUTER', 'Executing Router Node: Condition matched branch "Tech AI News".', 'info');
      }, 2200);

      // Step 2 Done & Line 2 Active
      const t4 = setTimeout(() => {
        const node2 = document.getElementById('node2');
        node2.className = 'wf-node completed';
        node2.querySelector('.node-status-badge').className = 'node-status-badge done';
        node2.querySelector('.node-status-badge').textContent = 'Done';
        document.getElementById('line2').className = 'node-connector-line active';
        appendLog('SUCCESS', 'Router Node complete. Branch dispatched.', 'success');
      }, 3600);

      // Step 3: Evaluator-Optimizer Node
      const t5 = setTimeout(() => {
        const node3 = document.getElementById('node3');
        node3.className = 'wf-node active';
        node3.querySelector('.node-status-badge').className = 'node-status-badge running';
        node3.querySelector('.node-status-badge').textContent = 'Evaluating';
        appendLog('EVALUATOR', 'Executing Evaluator-Optimizer Loop (Iteration 1/2). Accuracy 99.1%.', 'agent');
      }, 4000);

      // Step 3 Done & Line 3 Active
      const t6 = setTimeout(() => {
        const node3 = document.getElementById('node3');
        node3.className = 'wf-node completed';
        node3.querySelector('.node-status-badge').className = 'node-status-badge done';
        node3.querySelector('.node-status-badge').textContent = 'Done';
        document.getElementById('line3').className = 'node-connector-line active';
        appendLog('SUCCESS', 'Evaluator Node complete. Output optimized.', 'success');
      }, 5400);

      // Step 4: Human Gate Node
      const t7 = setTimeout(() => {
        const node4 = document.getElementById('node4');
        node4.className = 'wf-node active';
        node4.querySelector('.node-status-badge').className = 'node-status-badge running';
        node4.querySelector('.node-status-badge').textContent = 'HITL Gate';
        appendLog('HUMAN_GATE', 'Evaluating Human Checkpoint approval... Auto-approved by policy.', 'warn');
      }, 5800);

      // Step 4 Done & Line 4 Active
      const t8 = setTimeout(() => {
        const node4 = document.getElementById('node4');
        node4.className = 'wf-node completed';
        node4.querySelector('.node-status-badge').className = 'node-status-badge done';
        node4.querySelector('.node-status-badge').textContent = 'Approved';
        document.getElementById('line4').className = 'node-connector-line active';
        appendLog('SUCCESS', 'Human Gate Node approved.', 'success');
      }, 7000);

      // Step 5: Webhook Node
      const t9 = setTimeout(() => {
        const node5 = document.getElementById('node5');
        node5.className = 'wf-node active';
        node5.querySelector('.node-status-badge').className = 'node-status-badge running';
        node5.querySelector('.node-status-badge').textContent = 'Publishing';
        appendLog('WEBHOOK', 'Dispatching HTTP POST to Notion API & Slack #announcements...', 'info');
      }, 7400);

      // Final Completion
      const t10 = setTimeout(() => {
        const node5 = document.getElementById('node5');
        node5.className = 'wf-node completed';
        node5.querySelector('.node-status-badge').className = 'node-status-badge done';
        node5.querySelector('.node-status-badge').textContent = 'Done';
        wfStatusText.textContent = 'WORKFLOW EXECUTION COMPLETE • 100% SUCCESS';
        showToast('Pipeline Finished (Agent -> Router -> Evaluator -> HITL -> Webhook)!', 'success', 'ph-check-circle');
        appendLog('SUCCESS', 'Pipeline execution completed in 8.8s. 0 errors.', 'success');
        isWorkflowRunning = false;
      }, 8800);

      workflowTimeouts.push(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10);
    });
  }

  if (btnPauseWorkflow) {
    btnPauseWorkflow.addEventListener('click', () => {
      resetWorkflowUI();
      showToast('Workflow Execution Reset', 'warn', 'ph-pause');
      appendLog('SYSTEM', 'Workflow execution reset by user.', 'warn');
    });
  }

  /* ==========================================================================
     4. INTERACTIVE SIDE DRAWER (AGENT TEST & MINDIE)
     ========================================================================== */
  function openDrawer(agentName = 'Mindie Assistant') {
    currentActiveAgent = agentName;
    drawerTitle.innerHTML = `
      <i class="ph-bold ph-robot" style="color: var(--accent-violet);"></i>
      <span>${agentName}</span>
    `;
    chatMessages.innerHTML = `
      <div class="chat-msg agent">
        <div class="chat-bubble">
          Hello! I am <strong>${agentName}</strong>. How can I assist your workflow right now?
        </div>
      </div>
    `;
    drawerBackdrop.classList.add('open');
  }

  function closeDrawer() {
    drawerBackdrop.classList.remove('open');
  }

  if (openMindieDrawer) {
    openMindieDrawer.addEventListener('click', () => openDrawer('Mindie Assistant'));
  }
  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeDrawer);
  }
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) closeDrawer();
    });
  }

  // Agent Card "Test Chat" Buttons
  document.querySelectorAll('.test-agent-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const agent = e.target.getAttribute('data-agent') || 'AI Agent';
      openDrawer(agent);
    });
  });

  // Chat message sending simulation
  function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.innerHTML = `<div class="chat-bubble">${text}</div>`;
    chatMessages.appendChild(userMsg);
    chatInput.value = '';
    chatMessages.parentElement.scrollTop = chatMessages.parentElement.scrollHeight;

    appendLog('CHAT', `User sent prompt to [${currentActiveAgent}]: "${text}"`, 'info');

    // Simulate Agent Typing & Response
    setTimeout(() => {
      const agentMsg = document.createElement('div');
      agentMsg.className = 'chat-msg agent';
      
      let responseText = `I have processed your request for <strong>"${text}"</strong> using integrated knowledge base vector embeddings. Here is the generated plan:`;
      if (currentActiveAgent.includes('Research')) {
        responseText = `I searched our connected Knowledge Base and web sources. Found 4 relevant insights on "${text}". Ready to export to your workflow canvas!`;
      } else if (currentActiveAgent.includes('Ghostwriter')) {
        responseText = `Drafted 3 creative headline variations and a 200-word intro post matching your brand voice for "${text}".`;
      }

      agentMsg.innerHTML = `<div class="chat-bubble">${responseText}</div>`;
      chatMessages.appendChild(agentMsg);
      chatMessages.parentElement.scrollTop = chatMessages.parentElement.scrollHeight;
    }, 700);
  }

  if (sendChatBtn) sendChatBtn.addEventListener('click', handleSendMessage);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSendMessage();
    });
  }

  /* ==========================================================================
     5. COMMAND PALETTE MODAL (CTRL + K)
     ========================================================================== */
  function openCmdModal() {
    cmdModalBackdrop.classList.add('open');
    setTimeout(() => cmdSearchInput.focus(), 100);
  }

  function closeCmdModal() {
    cmdModalBackdrop.classList.remove('open');
  }

  if (triggerSearchModal) triggerSearchModal.addEventListener('click', openCmdModal);

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cmdModalBackdrop.classList.contains('open') ? closeCmdModal() : openCmdModal();
    }
    if (e.key === 'Escape') {
      closeCmdModal();
      closeDrawer();
    }
  });

  if (cmdModalBackdrop) {
    cmdModalBackdrop.addEventListener('click', (e) => {
      if (e.target === cmdModalBackdrop) closeCmdModal();
    });
  }

  // Filter commands
  if (cmdSearchInput) {
    cmdSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.cmd-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
      });
    });
  }

  /* ==========================================================================
     6. KNOWLEDGE BASE FILE DROPZONE INTERACTION
     ========================================================================== */
  if (dropzone) {
    dropzone.addEventListener('click', () => {
      const fileName = `Research_Brief_${Math.floor(Math.random() * 900 + 100)}.pdf`;
      
      const newKbItem = document.createElement('div');
      newKbItem.className = 'kb-item';
      newKbItem.innerHTML = `
        <div class="kb-info">
          <div class="kb-file-icon">
            <i class="ph-bold ph-file-pdf"></i>
          </div>
          <div class="kb-details">
            <span class="kb-name">${fileName}</span>
            <span class="kb-size">2.4 MB • Vectorizing...</span>
          </div>
        </div>
        <span class="kb-sync-status" style="color: var(--accent-amber);"><i class="ph-bold ph-spinner"></i> Syncing</span>
      `;

      kbList.prepend(newKbItem);
      showToast(`Uploaded ${fileName}`, 'info', 'ph-cloud-arrow-up');
      appendLog('KNOWLEDGE', `Started vector embedding for document: ${fileName}`, 'info');

      setTimeout(() => {
        newKbItem.querySelector('.kb-size').textContent = '2.4 MB • 890 Vectors';
        const statusSpan = newKbItem.querySelector('.kb-sync-status');
        statusSpan.style.color = 'var(--accent-emerald)';
        statusSpan.innerHTML = `<i class="ph-bold ph-check-circle"></i> Synced`;
        showToast(`${fileName} successfully vectorized!`, 'success', 'ph-check-circle');
        appendLog('SUCCESS', `Vector index created for ${fileName} (890 embeddings).`, 'success');
      }, 2000);
    });
  }

  /* Buttons listeners */
  document.getElementById('btnNewAgent')?.addEventListener('click', () => {
    openDrawer('New Agent Creator');
  });

  document.getElementById('btnNewWorkflow')?.addEventListener('click', () => {
    openDrawer('Mindie Workflow Builder');
  });

  document.getElementById('syncKbBtn')?.addEventListener('click', () => {
    showToast('Knowledge Base Vector Re-Sync Triggered', 'info', 'ph-arrows-clockwise');
    appendLog('KNOWLEDGE', 'Refreshing vector embeddings across 3 sources...', 'info');
  });

  /* Sidebar Navigation Tab Switching */
  document.querySelectorAll('.sidebar-nav .nav-item[data-tab]').forEach(navItem => {
    navItem.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.sidebar-nav .nav-item').forEach(i => i.classList.remove('active'));
      document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
      navItem.classList.add('active');

      const tabName = navItem.getAttribute('data-tab');
      
      // Hide all views & show target view
      document.querySelectorAll('.tab-view').forEach(view => view.classList.add('hidden'));
      const targetView = document.getElementById(`view-${tabName}`);
      if (targetView) {
        targetView.classList.remove('hidden');
      }

      // Scroll container to top
      const scrollable = document.querySelector('.content-scrollable');
      if (scrollable) scrollable.scrollTop = 0;

      showToast(`Switched to ${tabName.toUpperCase()} View`, 'info', 'ph-squares-four');
      appendLog('NAV', `Navigated to module view: [${tabName}]`, 'info');
    });
  });

  /* Command Palette Items Click Listener */
  document.querySelectorAll('.cmd-item').forEach(cmdItem => {
    cmdItem.addEventListener('click', () => {
      const text = cmdItem.textContent.trim();
      closeCmdModal();
      showToast(`Executing command: ${text}`, 'info', 'ph-lightning');
      appendLog('CMD', `Executed command palette action: "${text}"`, 'info');
      
      if (text.includes('Run Workflow')) {
        btnRunWorkflow?.click();
      } else if (text.includes('Agent')) {
        openDrawer('New Agent Creator');
      } else if (text.includes('Knowledge')) {
        dropzone?.click();
      }
    });
  });
});
