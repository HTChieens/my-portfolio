const steps = ["start", "empathize", "define", "ideate", "prototype", "test", "improve", "reflection"];
const stepLabels = {
  start: "Start",
  empathize: "Empathize",
  define: "Define",
  ideate: "Ideate",
  prototype: "Prototype",
  test: "Test",
  improve: "Improve",
  reflection: "Reflection"
};

const problemBank = {
  breakfast: {
    title: "Sinh viên bỏ bữa sáng",
    description: "Sinh viên thường bỏ bữa sáng trước khi đi học.",
    mission: "Thiết kế một giải pháp giúp sinh viên ăn sáng thuận tiện hơn.",
    stats: [
      ["7:15", "Thức dậy muộn, còn 45 phút đến tiết đầu."],
      ["8:00", "Vào lớp."],
      ["30k", "Ngân sách mỗi sáng."]
    ],
    insightQuestion: "Điều gì thật sự khiến sinh viên bỏ bữa?",
    defineExample: "Sinh viên có lịch học buổi sáng cần một cách ăn sáng nhanh bởi vì họ không có nhiều thời gian trước giờ học.",
    goodStatement: "Sinh viên có lịch học buổi sáng cần một cách ăn sáng nhanh bởi vì họ không có nhiều thời gian trước giờ học.",
    badStatement: "Sinh viên cần một app đặt đồ ăn.",
    defaultPrototype: {
      name: "Đặt trước breakfast box",
      user: "Sinh viên có lịch học buổi sáng",
      how: "Sinh viên chọn món trước giờ học, thanh toán nhanh và nhận breakfast box tại điểm lấy đồ gần lớp.",
      location: "Điểm nhận gần lớp",
      time: "7:30",
      price: "Khoảng 30k",
      screens: ["Chọn món", "Chọn giờ nhận", "Xác nhận điểm nhận"]
    },
    users: [
      {
        id: "lan",
        avatar: "👩",
        title: "Lan – Sinh viên năm 2",
        quote: "Tôi thường ngủ dậy lúc 7h15 và tiết đầu bắt đầu lúc 8h.",
        question: "Tại sao bạn thường bỏ bữa sáng?",
        answer: "Vì nếu ăn sáng thì tôi thường bị muộn học."
      },
      {
        id: "minh",
        avatar: "👨",
        title: "Minh – Sinh viên năm 4",
        quote: "Tôi có ăn sáng nhưng không muốn xếp hàng lâu.",
        question: "Điều gì làm bạn ngại ăn sáng ở trường?",
        answer: "Tôi không muốn xếp hàng lâu, nhất là khi chỉ còn 10 phút trước giờ học."
      },
      {
        id: "mai",
        avatar: "👩",
        title: "Mai – Sinh viên ở ký túc xá",
        quote: "Tôi muốn ăn sáng rẻ vì mỗi ngày chỉ có khoảng 30k.",
        question: "Điều gì quan trọng nhất khi chọn bữa sáng?",
        answer: "Giá phải rẻ và dễ lấy, vì ngày nào tôi cũng cần tiết kiệm."
      }
    ],
    research: ["Thói quen ăn sáng", "Thời gian di chuyển", "Ngân sách", "Món ăn yêu thích", "Lý do bỏ bữa"]
  },
  study: {
    title: "Sinh viên khó tập trung tự học",
    description: "Sinh viên muốn tự học sau giờ lên lớp nhưng dễ mất tập trung và không biết bắt đầu từ đâu.",
    mission: "Thiết kế một giải pháp giúp sinh viên duy trì việc tự học đều đặn hơn.",
    stats: [
      ["21:30", "Bắt đầu học khi đã mệt."],
      ["3 app", "Liên tục bị phân tâm."],
      ["25 phút", "Chỉ tập trung được một phiên ngắn."]
    ],
    insightQuestion: "Điều gì làm sinh viên bỏ cuộc khi tự học?",
    defineExample: "Sinh viên dễ mất tập trung cần một cách bắt đầu phiên học nhỏ và rõ bởi vì họ thường mệt và bị phân tâm sau giờ học.",
    goodStatement: "Sinh viên dễ mất tập trung cần một cách bắt đầu phiên học nhỏ và rõ bởi vì họ thường mệt và bị phân tâm sau giờ học.",
    badStatement: "Sinh viên cần một app Pomodoro.",
    defaultPrototype: {
      name: "Study sprint 25 phút",
      user: "Sinh viên dễ mất tập trung",
      how: "Sinh viên chọn một mục tiêu nhỏ, bật phiên học 25 phút và nhận gợi ý nghỉ ngắn sau khi hoàn thành.",
      location: "Góc học yên tĩnh hoặc thư viện",
      time: "25 phút mỗi phiên",
      price: "Miễn phí",
      screens: ["Chọn mục tiêu", "Bắt đầu phiên học", "Xem tiến độ"]
    },
    users: [
      {
        id: "an",
        avatar: "👩",
        title: "An – Sinh viên năm 1",
        quote: "Tôi mở tài liệu ra nhưng vài phút sau lại xem điện thoại.",
        question: "Điều gì khiến bạn mất tập trung nhanh nhất?",
        answer: "Tôi không biết nên học phần nào trước nên rất dễ chuyển sang việc khác."
      },
      {
        id: "khoa",
        avatar: "👨",
        title: "Khoa – Sinh viên đi làm thêm",
        quote: "Tối về tôi muốn học nhưng thường đã quá mệt.",
        question: "Bạn cần gì để vẫn học được khi mệt?",
        answer: "Tôi cần một mục tiêu rất nhỏ, nếu dài quá tôi sẽ bỏ."
      },
      {
        id: "trang",
        avatar: "👩",
        title: "Trang – Sinh viên năm cuối",
        quote: "Tôi có kế hoạch nhưng không giữ được đều.",
        question: "Vì sao kế hoạch tự học của bạn bị đứt đoạn?",
        answer: "Tôi không thấy tiến bộ rõ nên mất động lực sau vài ngày."
      }
    ],
    research: ["Thói quen tự học", "Nguồn gây phân tâm", "Thời điểm học", "Mức năng lượng", "Động lực duy trì"]
  },
  club: {
    title: "CLB khó thu hút thành viên mới",
    description: "Sinh viên năm nhất muốn tham gia hoạt động nhưng không biết CLB nào phù hợp.",
    mission: "Thiết kế một giải pháp giúp sinh viên tìm được CLB phù hợp hơn.",
    stats: [
      ["40+", "CLB cùng tuyển thành viên."],
      ["5 phút", "Thời gian xem thông tin tại booth."],
      ["Năm 1", "Nhóm dễ bị quá tải lựa chọn."]
    ],
    insightQuestion: "Điều gì làm sinh viên ngại tham gia CLB?",
    defineExample: "Sinh viên năm nhất cần một cách so sánh CLB phù hợp bởi vì họ bị quá tải thông tin trong mùa tuyển thành viên.",
    goodStatement: "Sinh viên năm nhất cần một cách so sánh CLB phù hợp bởi vì họ bị quá tải thông tin trong mùa tuyển thành viên.",
    badStatement: "Sinh viên cần một website giới thiệu CLB.",
    defaultPrototype: {
      name: "CLB match card",
      user: "Sinh viên năm nhất",
      how: "Sinh viên chọn sở thích, thời gian rảnh và mức cam kết để nhận danh sách CLB phù hợp kèm lý do đề xuất.",
      location: "Website tuyển thành viên của trường",
      time: "3 phút trả lời câu hỏi",
      price: "Miễn phí",
      screens: ["Chọn sở thích", "Xem CLB phù hợp", "Đăng ký thử"]
    },
    users: [
      {
        id: "vy",
        avatar: "👩",
        title: "Vy – Sinh viên năm 1",
        quote: "CLB nào cũng giới thiệu hay nên tôi không biết chọn cái nào.",
        question: "Điều gì làm bạn phân vân nhất?",
        answer: "Tôi sợ đăng ký xong mới biết lịch sinh hoạt không hợp."
      },
      {
        id: "duc",
        avatar: "👨",
        title: "Đức – Sinh viên năm 1",
        quote: "Tôi muốn tham gia nhưng ngại hỏi quá nhiều ở booth.",
        question: "Bạn muốn biết gì trước khi đăng ký?",
        answer: "Tôi muốn biết CLB có phù hợp với người mới không và cần cam kết bao nhiêu thời gian."
      },
      {
        id: "hanh",
        avatar: "👩",
        title: "Hạnh – Thành viên ban truyền thông",
        quote: "Nhiều bạn đăng ký nhưng sau đó không đi buổi nào.",
        question: "Vì sao thành viên mới dễ rời đi?",
        answer: "Có thể kỳ vọng ban đầu khác với hoạt động thật của CLB."
      }
    ],
    research: ["Sở thích", "Lịch sinh hoạt", "Mức cam kết", "Nỗi lo khi tham gia", "Kỳ vọng ban đầu"]
  }
};

const ideaGroupsByProblem = {
  breakfast: [
    {
      title: "Digital",
      ideas: ["Đặt trước bữa sáng", "AI dự đoán món ăn", "QR nhận đồ", "Lịch nhắc ăn sáng"]
    },
    {
      title: "Service",
      ideas: ["Breakfast box", "Căng tin giao đồ ăn đến lớp", "Quầy lấy đồ không cần xếp hàng", "Điểm nhận đồ gần lớp"]
    },
    {
      title: "Low-tech",
      ideas: ["Combo sáng 30k", "Phiếu ăn sáng theo tuần", "Bàn pick-up theo lớp", "Menu giấy đặt trước"]
    },
    {
      title: "Operation",
      ideas: ["Khung giờ nhận riêng", "Máy bán đồ ăn tự động", "Tủ giữ nhiệt", "Đối tác bán hàng gần cổng"]
    }
  ],
  study: [
    {
      title: "Digital",
      ideas: ["Focus timer", "Study buddy matching", "Distraction blocker", "Daily micro-goal"]
    },
    {
      title: "Service",
      ideas: ["Peer study room", "Tutor office hour", "Accountability group", "Library quiet slot"]
    },
    {
      title: "Low-tech",
      ideas: ["Study checklist card", "Printed weekly plan", "Phone parking box", "Progress sticker"]
    },
    {
      title: "Operation",
      ideas: ["Quiet zone booking", "Study sprint schedule", "Reminder board", "TA check-in"]
    }
  ],
  club: [
    {
      title: "Digital",
      ideas: ["CLB match quiz", "Calendar filter", "Member review board", "Interest tags"]
    },
    {
      title: "Service",
      ideas: ["CLB tour", "Trial session", "Mentor buddy", "Welcome desk"]
    },
    {
      title: "Low-tech",
      ideas: ["Comparison card", "One-page CLB map", "Question checklist", "Commitment badge"]
    },
    {
      title: "Operation",
      ideas: ["Booth route", "Trial week schedule", "Follow-up form", "Expectation matching"]
    }
  ]
};

const state = {
  currentStep: "start",
  selectedProblem: "breakfast",
  interviewedUser: "",
  researchTopics: new Set(),
  insightPassed: false,
  definePassed: false,
  defineMistakes: 0,
  ideas: [],
  selectedIdea: "",
  prototypeSaved: false,
  initialFeedbackItems: [],
  feedbackItems: [],
  selectedTestChoice: "",
  improveApplied: false,
  timerRemaining: 120,
  timerId: null
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function currentProblem() {
  return problemBank[state.selectedProblem];
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getValue(selector) {
  return $(selector)?.value.trim() || "";
}

function setValue(selector, value) {
  const element = $(selector);
  if (element) element.value = value;
}

function setStep(step) {
  state.currentStep = step;
  const activeIndex = steps.indexOf(step);

  $$(".screen").forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === step);
  });

  $$(".step-item").forEach((item) => {
    const itemIndex = steps.indexOf(item.dataset.step);
    item.classList.toggle("is-active", item.dataset.step === step);
    item.classList.toggle("is-done", itemIndex < activeIndex);
  });

  $("#status-pill").textContent = stepLabels[step];
  $(".workspace").scrollIntoView({ behavior: "smooth", block: "start" });

  if (step === "empathize") renderEmpathize();
  if (step === "define") updateDefineExample();
  if (step === "ideate") renderSuggestions();
  if (step === "prototype") hydratePrototypeFromIdea();
  if (step === "test") prepareTest();
  if (step === "improve") prepareImprove();
  if (step === "reflection") renderReflection();
}

function bindNavigation() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-go]");
    if (!button || button.disabled) return;
    setStep(button.dataset.go);
  });
}

function renderProblemChoices() {
  const grid = $("#problem-grid");
  grid.innerHTML = "";

  Object.entries(problemBank).forEach(([id, problem]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "problem-card";
    button.dataset.problem = id;
    button.innerHTML = `
      <strong>${escapeHtml(problem.title)}</strong>
      <p>${escapeHtml(problem.description)}</p>
    `;
    button.addEventListener("click", () => selectProblem(id));
    grid.appendChild(button);
  });

  selectProblem(state.selectedProblem);
}

function selectProblem(id) {
  state.selectedProblem = id;
  const problem = currentProblem();

  $$(".problem-card").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.problem === id);
  });

  $("#selected-problem-title").textContent = problem.title;
  $("#selected-problem-description").textContent = problem.description;
  $("#selected-problem-mission").textContent = problem.mission;
  $("#visual-stat-one").textContent = problem.stats[0][0];
  $("#visual-caption-one").textContent = problem.stats[0][1];
  $("#visual-stat-two").textContent = problem.stats[1][0];
  $("#visual-caption-two").textContent = problem.stats[1][1];
  $("#visual-stat-three").textContent = problem.stats[2][0];
  $("#visual-caption-three").textContent = problem.stats[2][1];
  $("#visual-insight-question").textContent = problem.insightQuestion;

  resetProblemDependentState();
}

function resetProblemDependentState() {
  state.interviewedUser = "";
  state.researchTopics = new Set();
  state.insightPassed = false;
  state.definePassed = false;
  state.defineMistakes = 0;
  state.ideas = [];
  state.selectedIdea = "";
  state.prototypeSaved = false;
  state.initialFeedbackItems = [];
  state.feedbackItems = [];
  state.selectedTestChoice = "";
  state.improveApplied = false;

  setValue("#insight-input", "");
  setValue("#problem-statement", "");
  $("#empathize-complete")?.classList.remove("is-visible");
  $("#insight-result")?.classList.remove("is-visible", "good", "warn");
  $("#to-ideate") && ($("#to-ideate").disabled = true);
  $("#to-prototype") && ($("#to-prototype").disabled = true);
  $("#to-test") && ($("#to-test").disabled = true);
  $("#to-improve") && ($("#to-improve").disabled = true);
  $("#to-reflection") && ($("#to-reflection").disabled = true);
  $$('input[name="test-choice"]').forEach((radio) => {
    radio.checked = false;
  });
  $$('input[name="improve-choice"]').forEach((checkbox) => {
    checkbox.checked = false;
  });
  setValue("#improve-plan", "");
  resetDefineResult();
  resetTestAndImproveResults();

  renderEmpathize();
  updateDefineExample();
  applyDefaultPrototype();
  renderIdeas();
  renderSuggestions();
}

function resetDefineResult() {
  const result = $("#define-result");
  if (!result) return;
  result.className = "define-result";
  result.innerHTML = `
    <h3>Problem Statement của bạn</h3>
    <div class="criteria">
      <div>User: Chưa đánh giá</div>
      <div>Need: Chưa đánh giá</div>
      <div>Reason: Chưa đánh giá</div>
      <div>Problem-not-solution: Chưa đánh giá</div>
    </div>
    <p>Nhấn đánh giá để xem statement đang là problem hay solution.</p>
  `;
}

function resetTestAndImproveResults() {
  ["#test-result", "#improve-result"].forEach((selector) => {
    const result = $(selector);
    if (!result) return;
    result.className = "test-result";
    result.innerHTML = "";
  });
  $("#feedback-list") && ($("#feedback-list").innerHTML = "");
  $("#improve-feedback-list") && ($("#improve-feedback-list").innerHTML = "");
}

function renderEmpathize() {
  const problem = currentProblem();
  const userGrid = $("#user-grid");
  const researchList = $("#research-list");
  userGrid.innerHTML = "";
  researchList.innerHTML = "";

  problem.users.forEach((user) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "user-card";
    button.dataset.user = user.id;
    button.innerHTML = `
      <span class="avatar">${user.avatar}</span>
      <strong>${escapeHtml(user.title)}</strong>
      <p>"${escapeHtml(user.quote)}"</p>
    `;
    button.addEventListener("click", () => interviewUser(user.id));
    userGrid.appendChild(button);
  });

  problem.research.forEach((topic) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" name="research" value="${escapeHtml(topic)}">${escapeHtml(topic)}`;
    const input = label.querySelector("input");
    input.checked = state.researchTopics.has(topic);
    input.addEventListener("change", () => {
      if (input.checked) {
        state.researchTopics.add(topic);
      } else {
        state.researchTopics.delete(topic);
      }
      updateEmpathizeCompletion();
    });
    researchList.appendChild(label);
  });

  if (state.interviewedUser) {
    interviewUser(state.interviewedUser);
  } else {
    $("#interview-panel").classList.remove("is-visible");
  }

  updateEmpathizeCompletion();
}

function interviewUser(userId) {
  state.interviewedUser = userId;
  const user = currentProblem().users.find((item) => item.id === userId);
  if (!user) return;

  $$(".user-card").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.user === userId);
  });

  $("#interview-title").textContent = `Phỏng vấn ${user.title.split("–")[0].trim()}`;
  $("#interview-dialogue").innerHTML = `
    <div class="line"><strong>Bạn:</strong> ${escapeHtml(user.question)}</div>
    <div class="line"><strong>${escapeHtml(user.title.split("–")[0].trim())}:</strong> ${escapeHtml(user.answer)}</div>
  `;
  $("#interview-panel").classList.add("is-visible");
  updateEmpathizeCompletion();
}

function updateEmpathizeCompletion() {
  const canCheck = Boolean(state.interviewedUser && state.researchTopics.size > 0);
  $("#check-insight").disabled = !canCheck;
  $("#empathize-complete").classList.toggle("is-visible", Boolean(canCheck && state.insightPassed));
}

function checkInsight() {
  const insight = getValue("#insight-input");
  const result = $("#insight-result");
  const selectedUser = currentProblem().users.find((user) => user.id === state.interviewedUser);
  const userName = selectedUser?.title.split("–")[0].trim().toLowerCase() || "";
  const hasUser = userName && insight.toLowerCase().includes(userName);
  const hasBecause = /vì|bởi vì|do|ngại|sợ|khó|cần|muốn/.test(insight.toLowerCase());
  const isSpecific = insight.length >= 45;

  result.className = "insight-result is-visible";

  if (hasUser && hasBecause && isSpecific) {
    state.insightPassed = true;
    result.classList.add("good");
    result.innerHTML = `
      <h3>Insight tốt</h3>
      <p>Bạn đã nối user với nguyên nhân cụ thể. Đây là dữ liệu tốt để chuyển sang Define.</p>
    `;
  } else {
    state.insightPassed = false;
    result.classList.add("warn");
    result.innerHTML = `
      <h3>Insight chưa đủ sâu</h3>
      <p>Hãy nhắc đến user đã phỏng vấn và lý do phía sau hành vi. Ví dụ: "${selectedUser?.title.split("–")[0].trim() || "User"} bỏ bữa vì sợ muộn học."</p>
    `;
  }

  updateEmpathizeCompletion();
}

function updateDefineExample() {
  const problem = currentProblem();
  $("#define-example").innerHTML = `<strong>Ví dụ:</strong> ${escapeHtml(problem.defineExample)}`;
}

function fillGoodStatement() {
  setValue("#problem-statement", currentProblem().goodStatement);
  evaluateStatement();
}

function fillSolutionStatement() {
  setValue("#problem-statement", currentProblem().badStatement);
  evaluateStatement();
}

function criterion(label, ok, warn = false) {
  const icon = ok ? "OK" : warn ? "Check" : "Missing";
  const className = ok ? "pass" : warn ? "warn" : "";
  return `<div class="${className}">${label}: ${icon}</div>`;
}

function criteriaMarkup(score) {
  return `
    <div class="criteria">
      ${criterion("User", score.hasUser)}
      ${criterion("Need", score.hasNeed)}
      ${criterion("Reason", score.hasReason)}
      ${criterion("Problem-not-solution", score.isProblem, score.looksLikeSolution)}
    </div>
  `;
}

function evaluateStatement() {
  const raw = getValue("#problem-statement");
  const text = raw.toLowerCase();
  const solutionWords = /(app|ứng dụng|website|tính năng|grab|máy bán|đặt đồ ăn|đặt món|hệ thống|platform|qr|pomodoro|trí tuệ nhân tạo)/;
  const hasUser = /sinh viên|student|người học|thành viên|user|người dùng/.test(text);
  const hasNeed = /cần|muốn|khó|gặp khó khăn|chưa thể|không biết|bị/.test(text);
  const hasReason = /bởi vì|vì|do|khi|trước giờ|sau giờ|nên/.test(text);
  const looksLikeSolution = solutionWords.test(text);
  const isProblem = !looksLikeSolution || (hasReason && /pain|muộn|thiếu|quá tải|phân tâm|mệt|xếp hàng|ngại|không rõ|không biết/.test(text));
  const score = { hasUser, hasNeed, hasReason, looksLikeSolution, isProblem };
  const result = $("#define-result");

  result.className = "define-result";

  if (!raw) {
    result.innerHTML = `
      <h3>Problem Statement của bạn</h3>
      ${criteriaMarkup({ hasUser: false, hasNeed: false, hasReason: false, looksLikeSolution: false, isProblem: false })}
      <p>Hãy viết statement theo cấu trúc: Sinh viên ______ cần ______ bởi vì ______.</p>
    `;
    state.definePassed = false;
  } else if (!isProblem) {
    result.classList.add("warn");
    result.innerHTML = `
      <h3>Đây vẫn nghiêng về solution</h3>
      ${criteriaMarkup(score)}
      <p>Bạn đang nói về cách giải quyết. Hãy quay lại pain point: user nào, họ cần gì, vì sao nhu cầu đó tồn tại.</p>
    `;
    state.definePassed = false;
    state.defineMistakes += 1;
  } else if (hasUser && hasNeed && hasReason && isProblem) {
    result.classList.add("good");
    result.innerHTML = `
      <h3>Problem statement tốt</h3>
      ${criteriaMarkup(score)}
      <p>Bạn đã nêu rõ user, nhu cầu, lý do và chưa nhảy thẳng vào solution.</p>
    `;
    state.definePassed = true;
  } else {
    result.classList.add("warn");
    result.innerHTML = `
      <h3>Statement chưa đủ rõ</h3>
      ${criteriaMarkup(score)}
      <p>Hãy kiểm tra đủ ba phần: ai là user, họ cần gì, và vì sao nhu cầu đó tồn tại.</p>
    `;
    state.definePassed = false;
    state.defineMistakes += 1;
  }

  $("#to-ideate").disabled = !state.definePassed;
}

function startTimer() {
  if (state.timerId) return;
  state.timerId = window.setInterval(() => {
    state.timerRemaining = Math.max(0, state.timerRemaining - 1);
    renderTimer();
    if (state.timerRemaining === 0) {
      stopTimer();
      $("#idea-challenge").textContent = "Hết 2 phút. Nếu chưa đủ 10 ý tưởng, hãy thêm vài hướng khác trước khi chọn.";
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function resetTimer() {
  stopTimer();
  state.timerRemaining = 120;
  renderTimer();
}

function renderTimer() {
  const minutes = String(Math.floor(state.timerRemaining / 60)).padStart(2, "0");
  const seconds = String(state.timerRemaining % 60).padStart(2, "0");
  $("#idea-timer").textContent = `${minutes}:${seconds}`;
}

function renderSuggestions() {
  const holder = $("#idea-suggestions");
  if (!holder) return;
  holder.innerHTML = "";

  const groups = ideaGroupsByProblem[state.selectedProblem] || ideaGroupsByProblem.breakfast;

  groups.forEach((group) => {
    const section = document.createElement("section");
    section.className = "idea-category";
    section.innerHTML = `<strong>${escapeHtml(group.title)}</strong><div class="chip-list"></div>`;
    const list = section.querySelector(".chip-list");

    group.ideas.forEach((idea) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chip-button";
      button.textContent = idea;
      button.disabled = state.ideas.includes(idea);
      button.addEventListener("click", () => addIdea(idea));
      list.appendChild(button);
    });

    holder.appendChild(section);
  });
}

function addIdea(value) {
  const idea = value.trim();
  if (!idea || state.ideas.includes(idea)) return;
  state.ideas.push(idea);
  setValue("#idea-input", "");
  renderIdeas();
  renderSuggestions();
}

function renderIdeas() {
  const list = $("#idea-list");
  if (!list) return;
  const canSelect = state.ideas.length >= 10;

  $("#idea-counter").textContent = `Ideas: ${state.ideas.length}`;
  $("#idea-challenge").textContent = canSelect
    ? "Bạn đã có đủ 10 ý tưởng. Bây giờ hãy chọn 1 ý tưởng để prototype."
    : `Challenge: Còn ${10 - state.ideas.length} ý tưởng nữa trước khi được chọn.`;

  list.innerHTML = "";
  state.ideas.forEach((idea, index) => {
    const card = document.createElement("article");
    card.className = "idea-card";
    card.classList.toggle("is-selected", state.selectedIdea === idea);
    card.innerHTML = `<strong>${index + 1}. ${escapeHtml(idea)}</strong>`;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = state.selectedIdea === idea ? "Đã chọn" : "Chọn ý tưởng";
    button.disabled = !canSelect;
    button.addEventListener("click", () => {
      state.selectedIdea = idea;
      $("#to-prototype").disabled = false;
      renderIdeas();
    });

    card.appendChild(button);
    list.appendChild(card);
  });

  if (!canSelect) $("#to-prototype").disabled = true;
}

function applyDefaultPrototype() {
  const prototype = currentProblem().defaultPrototype;
  setValue("#solution-name", prototype.name);
  setValue("#solution-user", prototype.user);
  setValue("#solution-how", prototype.how);
  setValue("#solution-location", prototype.location);
  setValue("#solution-time", prototype.time);
  setValue("#solution-price", prototype.price);
  setValue("#screen-one", prototype.screens[0]);
  setValue("#screen-two", prototype.screens[1]);
  setValue("#screen-three", prototype.screens[2]);
  updateMockup();
}

function hydratePrototypeFromIdea() {
  if (state.selectedIdea) setValue("#solution-name", state.selectedIdea);
  updateMockup();
}

function prototypeFields() {
  return [
    "#solution-name",
    "#solution-user",
    "#solution-how",
    "#solution-location",
    "#solution-time",
    "#solution-price",
    "#screen-one",
    "#screen-two",
    "#screen-three"
  ].map($);
}

function prototypeIsComplete() {
  return prototypeFields().every((field) => field && field.value.trim());
}

function updateMockup() {
  const title = getValue("#solution-name") || "Prototype";
  const user = getValue("#solution-user") || "Chưa rõ user";
  const how = getValue("#solution-how") || "Chưa rõ cách hoạt động";
  const location = getValue("#solution-location") || "Chưa rõ địa điểm";
  const time = getValue("#solution-time") || "Chưa rõ thời gian";
  const price = getValue("#solution-price") || "Chưa rõ chi phí";
  const screens = [getValue("#screen-one"), getValue("#screen-two"), getValue("#screen-three")].filter(Boolean);

  $("#mockup-heading").textContent = title;
  $("#mock-title").textContent = title.toUpperCase();
  $("#mock-user").textContent = user;
  $("#mock-how").textContent = how;
  $("#mock-location").textContent = location;
  $("#mock-price").textContent = price;
  $("#mock-time").textContent = `Thời gian: ${time}`;
  $("#mock-screen-list").innerHTML = screens
    .map((screen, index) => `<div class="mock-screen"><span>${index + 1}</span><b>${escapeHtml(screen)}</b></div>`)
    .join("");
}

function savePrototype() {
  state.prototypeSaved = prototypeIsComplete();
  $("#to-test").disabled = !state.prototypeSaved;
  updateMockup();
}

function feedbackItem(type, label, text) {
  return { type, label, text };
}

function prepareTest() {
  updateMockup();
  state.feedbackItems = buildFeedback();
  state.initialFeedbackItems = [...state.feedbackItems];
  state.selectedTestChoice = "";
  $$('input[name="test-choice"]').forEach((radio) => {
    radio.checked = false;
  });
  $("#test-result").className = "test-result";
  $("#test-result").innerHTML = "";
  $("#to-improve").disabled = true;
  renderFeedback("#feedback-list", state.feedbackItems);

  const tester = currentProblem().users[0];
  $("#test-user-title").textContent = `${tester.avatar} ${tester.title.split("–")[0].trim()} đang thử sản phẩm của bạn`;
  $("#lan-feedback").textContent = `"Ý tưởng ${getValue("#solution-name") || "này"} khá tiện, nhưng tôi cần hiểu rõ hơn trước khi dùng thật."`;
}

function buildFeedback() {
  const location = getValue("#solution-location").toLowerCase();
  const time = getValue("#solution-time").toLowerCase();
  const price = getValue("#solution-price").toLowerCase();
  const how = getValue("#solution-how").toLowerCase();
  const screens = [getValue("#screen-one"), getValue("#screen-two"), getValue("#screen-three")].join(" ").toLowerCase();
  const items = [];

  if (!location || /gần|đâu|chưa rõ|không rõ|n\/a/.test(location)) {
    items.push(feedbackItem("problem", "Problem", "User chưa biết chính xác địa điểm hoặc kênh nhận."));
  }

  if (!time || !/\d|phút|giờ|:/.test(time)) {
    items.push(feedbackItem("confusion", "Confusion", "Thời gian nhận hoặc thời lượng sử dụng chưa đủ rõ."));
  }

  if (!price || !/\d|miễn phí|free|k|ngân sách/.test(price)) {
    items.push(feedbackItem("confusion", "Confusion", "Chi phí hoặc ràng buộc ngân sách chưa rõ."));
  }

  if (!/nhận|lấy|pick|giao|bắt đầu|xem|đăng ký|chọn/.test(how + " " + screens)) {
    items.push(feedbackItem("problem", "Problem", "User chưa hình dung được hành động chính trong prototype."));
  }

  if (screens.split(/\s+/).filter(Boolean).length < 6) {
    items.push(feedbackItem("confusion", "Confusion", "Ba màn hình chính còn quá chung, chưa thể test hành trình."));
  }

  items.push(feedbackItem("positive", "Positive", `Ý tưởng "${getValue("#solution-name") || "prototype"}" có thể giúp user tiết kiệm thời gian nếu các điểm chưa rõ được sửa.`));

  if (items.filter((item) => item.type !== "positive").length === 0) {
    items.unshift(feedbackItem("neutral", "Observation", "Prototype đã khá rõ. Vòng tiếp theo nên kiểm tra xem user có thật sự dùng trong bối cảnh thực tế không."));
  }

  return items;
}

function renderFeedback(selector, items) {
  const list = $(selector);
  list.innerHTML = items
    .map((item) => `<div class="feedback-item ${item.type}"><strong>${escapeHtml(item.label)}</strong>${escapeHtml(item.text)}</div>`)
    .join("");
}

function handleTestChoice(value) {
  state.selectedTestChoice = value;
  const result = $("#test-result");
  result.className = "test-result is-visible";

  if (value === "B") {
    result.classList.add("good");
    result.innerHTML = `
      <h3>Đáp án tốt nhất: B. Cải thiện prototype</h3>
      <p>Feedback cho thấy điều cần học tiếp. Vòng đúng là <strong>Test → Improve → Test again</strong>.</p>
    `;
    $("#to-improve").disabled = false;
  } else {
    result.classList.add("warn");
    result.innerHTML = `
      <h3>Chưa phải lựa chọn tốt nhất</h3>
      <p>Sau Test, mục tiêu không phải bỏ ngay, thêm lung tung hay giữ nguyên. Hãy cải thiện phần user đang vướng.</p>
    `;
    $("#to-improve").disabled = true;
  }
}

function prepareImprove() {
  renderFeedback("#improve-feedback-list", state.feedbackItems);
  $("#improve-result").className = "test-result";
  $("#improve-result").innerHTML = "";
  $("#to-reflection").disabled = !state.improveApplied;
}

function applyImprovements() {
  const selected = $$('input[name="improve-choice"]:checked').map((item) => item.value);
  const plan = getValue("#improve-plan");
  const result = $("#improve-result");
  result.className = "test-result is-visible";

  if (selected.length === 0 || plan.length < 30) {
    result.classList.add("warn");
    result.innerHTML = `
      <h3>Cải thiện chưa đủ cụ thể</h3>
      <p>Hãy chọn ít nhất một điểm cần sửa và viết rõ thay đổi bạn sẽ làm trong prototype.</p>
    `;
    state.improveApplied = false;
    $("#to-reflection").disabled = true;
    return;
  }

  if (selected.includes("location") && /gần|chưa rõ|không rõ/i.test(getValue("#solution-location"))) {
    setValue("#solution-location", "Sảnh tòa A, cạnh thang máy tầng 1");
  }
  if (selected.includes("time") && !/\d|:|phút|giờ/i.test(getValue("#solution-time"))) {
    setValue("#solution-time", "7:25-7:45");
  }
  if (selected.includes("price") && !/\d|miễn phí|free|k/i.test(getValue("#solution-price"))) {
    setValue("#solution-price", "Tối đa 30k");
  }
  if (selected.includes("screens")) {
    setValue("#screen-one", "Chọn option phù hợp");
    setValue("#screen-two", "Xác nhận thời gian và địa điểm");
    setValue("#screen-three", "Nhận hướng dẫn sử dụng");
  }

  updateMockup();
  const beforeCount = state.feedbackItems.filter((item) => item.type !== "positive").length;
  state.feedbackItems = buildFeedback();
  const afterCount = state.feedbackItems.filter((item) => item.type !== "positive").length;
  renderFeedback("#improve-feedback-list", state.feedbackItems);
  state.improveApplied = true;
  result.classList.add("good");
  result.innerHTML = `
    <h3>Prototype đã được cải thiện</h3>
    <p>Bạn đã dùng feedback để sửa bản nháp và test lại. Số điểm chưa rõ giảm từ ${beforeCount} xuống ${afterCount}.</p>
  `;
  $("#to-reflection").disabled = false;
}

function renderReflection() {
  const problem = currentProblem();
  const selectedUser = problem.users.find((user) => user.id === state.interviewedUser);
  const initialFeedback = state.initialFeedbackItems.length ? state.initialFeedbackItems : state.feedbackItems;
  const feedbackProblems = initialFeedback.filter((item) => item.type !== "positive").length;
  const remainingProblems = state.feedbackItems.filter((item) => item.type !== "positive").length;
  const plan = getValue("#improve-plan") || "Chưa ghi kế hoạch cải thiện.";
  const summary = $("#reflection-summary");

  summary.innerHTML = `
    <h3>Tổng kết hành trình của bạn</h3>
    <div class="summary-grid">
      <div class="summary-card">
        <strong>Challenge đã chọn</strong>
        <p>${escapeHtml(problem.title)}</p>
      </div>
      <div class="summary-card">
        <strong>User đã phỏng vấn</strong>
        <p>${escapeHtml(selectedUser?.title || "Chưa chọn user")}</p>
      </div>
      <div class="summary-card">
        <strong>Insight của bạn</strong>
        <p>${escapeHtml(getValue("#insight-input") || "Chưa ghi insight")}</p>
      </div>
      <div class="summary-card">
        <strong>Problem statement</strong>
        <p>${escapeHtml(getValue("#problem-statement") || "Chưa ghi statement")}</p>
      </div>
      <div class="summary-card">
        <strong>Ideation</strong>
        <p>Bạn tạo ${state.ideas.length} ý tưởng và chọn "${escapeHtml(state.selectedIdea || getValue("#solution-name") || "chưa chọn")}".</p>
      </div>
      <div class="summary-card">
        <strong>Feedback</strong>
        <p>Test đầu phát hiện ${feedbackProblems} điểm cần cải thiện; sau Improve còn ${remainingProblems} điểm. Kế hoạch sửa: ${escapeHtml(plan)}</p>
      </div>
    </div>
  `;
}

function restartChallenge() {
  resetTimer();
  selectProblem("breakfast");
  setStep("start");
}

function bindEvents() {
  bindNavigation();
  $("#check-insight").addEventListener("click", checkInsight);
  $("#fill-good-statement").addEventListener("click", fillGoodStatement);
  $("#fill-solution-statement").addEventListener("click", fillSolutionStatement);
  $("#evaluate-statement").addEventListener("click", evaluateStatement);
  $("#start-timer").addEventListener("click", startTimer);
  $("#reset-timer").addEventListener("click", resetTimer);
  $("#add-idea").addEventListener("click", () => addIdea(getValue("#idea-input")));
  $("#idea-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addIdea(getValue("#idea-input"));
    }
  });
  $("#save-prototype").addEventListener("click", savePrototype);
  prototypeFields().forEach((field) => {
    field.addEventListener("input", () => {
      state.prototypeSaved = false;
      $("#to-test").disabled = true;
      updateMockup();
    });
  });
  $$('input[name="test-choice"]').forEach((radio) => {
    radio.addEventListener("change", () => handleTestChoice(radio.value));
  });
  $("#apply-improvements").addEventListener("click", applyImprovements);
  $("#restart-challenge").addEventListener("click", restartChallenge);
}

function init() {
  renderProblemChoices();
  renderEmpathize();
  renderSuggestions();
  renderIdeas();
  renderTimer();
  applyDefaultPrototype();
  bindEvents();
  updateEmpathizeCompletion();
}

init();
