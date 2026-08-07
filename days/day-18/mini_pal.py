"""
Mini-PAL: Minimal Agent Runtime (Day 18 Task)
Tác giả: Hoàng Thanh Chiến
Cấu trúc: Orchestration Loop + Tool-Calling Engine + Conversation Memory
"""

import json
import inspect
from typing import Callable, Dict, Any, List, Optional


# ==========================================
# 1. MEMORY MANAGER
# ==========================================
class MemoryManager:
    """Manages agent conversation history and turn state."""
    
    def __init__(self, system_prompt: Optional[str] = None):
        self.messages: List[Dict[str, Any]] = []
        if system_prompt:
            self.add_message("system", system_prompt)

    def add_message(self, role: str, content: str, tool_calls: Optional[List[Dict]] = None, tool_call_id: Optional[str] = None):
        msg = {"role": role, "content": content}
        if tool_calls:
            msg["tool_calls"] = tool_calls
        if tool_call_id:
            msg["tool_call_id"] = tool_call_id
        self.messages.append(msg)

    def get_history(self) -> List[Dict[str, Any]]:
        return self.messages

    def print_history(self):
        print("\n=== CONVERSATION MEMORY STATE ===")
        for idx, msg in enumerate(self.messages):
            role = msg['role'].upper()
            content = msg.get('content', '')
            t_calls = msg.get('tool_calls', '')
            print(f"[{idx+1}] {role}: {content} {f'| Calls: {t_calls}' if t_calls else ''}")
        print("==================================\n")


# ==========================================
# 2. TOOL REGISTRY & DISPATCHER
# ==========================================
class ToolRegistry:
    """Registers functions and handles tool execution with error boundaries."""
    
    def __init__(self):
        self._tools: Dict[str, Callable] = {}
        self._schemas: List[Dict[str, Any]] = []

    def register(self, name: str, description: str, schema: Dict[str, Any]):
        """Decorator or method to register a tool."""
        def decorator(func: Callable):
            self._tools[name] = func
            self._schemas.append({
                "name": name,
                "description": description,
                "parameters": schema
            })
            return func
        return decorator

    def get_schemas(self) -> List[Dict[str, Any]]:
        return self._schemas

    def execute(self, tool_name: str, arguments: Dict[str, Any]) -> str:
        """Safely executes a tool and returns the result as string."""
        if tool_name not in self._tools:
            return f"Error: Tool '{tool_name}' is not registered."
        
        try:
            func = self._tools[tool_name]
            result = func(**arguments)
            return json.dumps(result, ensure_ascii=False)
        except Exception as e:
            return f"Execution Error in Tool '{tool_name}': {str(e)}"


# ==========================================
# MOCK TOOLS DEFINITION
# ==========================================
registry = ToolRegistry()

@registry.register(
    name="get_order_details",
    description="Tra cứu thông tin chi tiết của một đơn hàng theo Mã Đơn Hàng (order_id).",
    schema={
        "type": "object",
        "properties": {
            "order_id": {"type": "string", "description": "Mã đơn hàng, ví dụ: ORD-101, ORD-102"}
        },
        "required": ["order_id"]
    }
)
def get_order_details(order_id: str) -> Dict[str, Any]:
    mock_db = {
        "ORD-101": {"items": [{"name": "Áo sơ mi Premium", "price": 450000}, {"name": "Quần Tây Khaki", "price": 550000}], "status": "pending"},
        "ORD-102": {"items": [{"name": "Giày Sneaker", "price": 1200000}], "status": "shipped"}
    }
    return mock_db.get(order_id.upper(), {"error": f"Không tìm thấy đơn hàng {order_id}"})


@registry.register(
    name="apply_discount",
    description="Tính giá trị chiết khấu và tổng tiền sau giảm giá theo Mã Giảm Giá (promo_code).",
    schema={
        "type": "object",
        "properties": {
            "subtotal": {"type": "number", "description": "Tổng tiền ban đầu của đơn hàng"},
            "promo_code": {"type": "string", "description": "Mã giảm giá, ví dụ: HE2026, CHAOCHAO"}
        },
        "required": ["subtotal", "promo_code"]
    }
)
def apply_discount(subtotal: float, promo_code: str) -> Dict[str, Any]:
    promos = {
        "HE2026": 0.20,  # Giảm 20%
        "CHAOCHAO": 0.10 # Giảm 10%
    }
    discount_rate = promos.get(promo_code.upper(), 0.0)
    discount_amount = subtotal * discount_rate
    final_price = subtotal - discount_amount
    return {
        "subtotal": subtotal,
        "promo_code": promo_code,
        "discount_percent": f"{int(discount_rate * 100)}%",
        "discount_amount": discount_amount,
        "final_price": final_price
    }


# ==========================================
# 3. MOCK LLM DRIVER (DETERMINISTIC SIMULATOR FOR TEST)
# ==========================================
class MockLLMDriver:
    """Simulates LLM tool calling reasoning for offline demonstration without requiring API keys."""
    
    def generate(self, messages: List[Dict[str, Any]], tools_schema: List[Dict[str, Any]]) -> Dict[str, Any]:
        last_msg = messages[-1]
        
        # Turn 1: User asks for order ORD-101 and discount code HE2026
        if last_msg["role"] == "user":
            return {
                "thought": "Người dùng muốn kiểm tra đơn hàng ORD-101 và áp dụng mã HE2026. Trước tiên tôi cần tra cứu thông tin đơn hàng ORD-101.",
                "tool_calls": [
                    {
                        "id": "call_001",
                        "name": "get_order_details",
                        "args": {"order_id": "ORD-101"}
                    }
                ],
                "content": None
            }

        # Turn 2: After getting order details, calculate total and call apply_discount
        if last_msg["role"] == "tool" and last_msg["tool_call_id"] == "call_001":
            order_data = json.loads(last_msg["content"])
            subtotal = sum(item["price"] for item in order_data.get("items", []))
            return {
                "thought": f"Đơn hàng ORD-101 có tổng subtotal là {subtotal} VNĐ. Bây giờ tôi sẽ gọi tool apply_discount để áp dụng mã HE2026.",
                "tool_calls": [
                    {
                        "id": "call_002",
                        "name": "apply_discount",
                        "args": {"subtotal": subtotal, "promo_code": "HE2026"}
                    }
                ],
                "content": None
            }

        # Turn 3: Final Synthesis
        if last_msg["role"] == "tool" and last_msg["tool_call_id"] == "call_002":
            res = json.loads(last_msg["content"])
            return {
                "thought": "Đã có đủ dữ liệu đơn hàng và chiết khấu. Tiến hành tạo câu trả lời tổng hợp cuối cùng.",
                "tool_calls": None,
                "content": f"🎉 **Báo cáo đơn hàng ORD-101**:\n- **Danh sách sản phẩm**: Áo sơ mi Premium (450,000đ) & Quần Tây Khaki (550,000đ)\n- **Tạm tính (Subtotal)**: 1,000,000 VNĐ\n- **Mã giảm giá áp dụng**: HE2026 (Giảm 20% = -200,000 VNĐ)\n- **Tổng thanh toán cuối cùng**: **800,000 VNĐ**"
            }
        
        return {"thought": "Nhiệm vụ hoàn thành.", "tool_calls": None, "content": "Hoàn tất xử lý."}


# ==========================================
# 4. ORCHESTRATION LOOP (MINI-PAL RUNTIME)
# ==========================================
class MiniPAL:
    """Minimal Agent Runtime combining Orchestration Loop, Tool Calling, and Memory."""

    def __init__(self, tool_registry: ToolRegistry, llm_driver=None, system_prompt: str = "Bạn là trợ lý Mini-PAL thông minh do Hoàng Thanh Chiến phát triển."):
        self.memory = MemoryManager(system_prompt=system_prompt)
        self.tools = tool_registry
        self.llm = llm_driver or MockLLMDriver()

    def run(self, user_prompt: str, max_steps: int = 5) -> str:
        print(f"🚀 [Mini-PAL Runtime Started] Goal: {user_prompt}")
        print("=" * 60)
        
        # Step 1: Push User Input to Memory
        self.memory.add_message("user", user_prompt)

        # Step 2: Orchestration Loop (ReAct Style)
        for step in range(1, max_steps + 1):
            print(f"\n🔄 --- STEP {step}/{max_steps} ---")
            
            # A. Invoke LLM with current Memory state and Tool schemas
            response = self.llm.generate(
                messages=self.memory.get_history(),
                tools_schema=self.tools.get_schemas()
            )
            
            thought = response.get("thought", "")
            tool_calls = response.get("tool_calls")
            content = response.get("content")

            print(f"🧠 [Agent Thought]: {thought}")

            # B. If LLM produced a final answer, append to Memory and Return
            if not tool_calls:
                print(f"✅ [Final Output]:\n{content}")
                self.memory.add_message("assistant", content or "")
                print("\n🏁 [Orchestration Loop Finished Successfully]")
                return content or ""

            # C. Record Assistant Tool-Call decision in Memory
            self.memory.add_message(
                role="assistant",
                content=f"[Thought]: {thought}",
                tool_calls=tool_calls
            )

            # D. Dispatch and Execute each Tool Call
            for call in tool_calls:
                call_id = call["id"]
                t_name = call["name"]
                t_args = call["args"]
                
                print(f"🛠️ [Tool Executing]: {t_name}({json.dumps(t_args, ensure_ascii=False)})")
                
                # Execute Tool safely
                result_str = self.tools.execute(t_name, t_args)
                print(f"📥 [Tool Result]: {result_str}")

                # E. Push Tool Output back into Memory
                self.memory.add_message(
                    role="tool",
                    content=result_str,
                    tool_call_id=call_id
                )

        print("⚠️ [Max Steps Reached] Loop terminated by safeguard.")
        return "Task could not be completed within the step limit."


# ==========================================
# MAIN EXECUTION
# ==========================================
if __name__ == "__main__":
    agent = MiniPAL(tool_registry=registry)
    user_request = "Hãy kiểm tra đơn hàng ORD-101, áp dụng mã giảm giá HE2026 và tính tổng tiền hóa đơn giúp tôi."
    
    final_response = agent.run(user_request, max_steps=5)
    
    # Inspect final Memory state
    agent.memory.print_history()
