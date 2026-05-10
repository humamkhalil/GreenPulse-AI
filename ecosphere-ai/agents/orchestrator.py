import os
from typing import Dict, Any
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
from langchain.agents import initialize_agent, Tool, AgentType

# Set up the LLM
# Ensure OPENAI_API_KEY is set in environment variables
llm = ChatOpenAI(temperature=0.2, model="gpt-4-turbo")

# --- Define Agent Personas (Tools/Functions) ---

def crop_doctor_tool(input_str: str) -> str:
    """Simulates the Crop Doctor agent."""
    return "Crop Doctor Analysis: Based on the image and symptoms, the crop has leaf blight. Recommended action: Apply fungicide X."

def irrigation_tool(input_str: str) -> str:
    """Simulates the Smart Irrigation agent."""
    return "Irrigation Analysis: Soil moisture is at 20%. Watering is required tomorrow for 2 hours."

def market_tool(input_str: str) -> str:
    """Simulates the Market Intelligence agent."""
    return "Market Intelligence: Current local price is high. Good time to sell."

def forest_tool(input_str: str) -> str:
    """Simulates the Forest Guard agent."""
    return "Forest Agent: No deforestation detected in the surrounding buffer zone."

def pollution_tool(input_str: str) -> str:
    """Simulates the Pollution Monitor agent."""
    return "Pollution Agent: Fertilizer runoff risk is moderate based on recent rainfall."

def waste_tool(input_str: str) -> str:
    """Simulates the Waste Manager agent."""
    return "Waste Agent: Recommend composting crop residue instead of burning."

def climate_tool(input_str: str) -> str:
    """Simulates the Climate Risk agent."""
    return "Climate Risk: Heavy rainfall expected in 48 hours."

def sustainability_tool(input_str: str) -> str:
    """Simulates the Sustainability Scorer agent."""
    return "Sustainability Agent: Overall farm score is 75/100. Improving irrigation will boost this to 82."

# --- Define LangChain Tools ---
tools = [
    Tool(name="CropDoctor", func=crop_doctor_tool, description="Use when user asks about plant diseases, pests, or crop health from images/descriptions."),
    Tool(name="SmartIrrigation", func=irrigation_tool, description="Use when user asks about watering, soil moisture, or irrigation schedules."),
    Tool(name="MarketIntelligence", func=market_tool, description="Use when user asks about crop prices, selling, or market trends."),
    Tool(name="ForestGuard", func=forest_tool, description="Use for queries about deforestation or tree coverage."),
    Tool(name="PollutionMonitor", func=pollution_tool, description="Use for queries about fertilizer runoff, pesticide pollution, or water quality."),
    Tool(name="WasteManager", func=waste_tool, description="Use for queries about crop residue, burning, or composting."),
    Tool(name="ClimateRisk", func=climate_tool, description="Use for weather forecasts, flood risks, and climate alerts."),
    Tool(name="SustainabilityScorer", func=sustainability_tool, description="Use to get the overall eco-score or sustainability metrics for the farm.")
]

# --- Memory Management ---
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

# --- Initialize Orchestrator Agent ---
# The Zero-shot ReAct agent handles routing and collaboration automatically 
# based on tool descriptions.
orchestrator = initialize_agent(
    tools, 
    llm, 
    agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION, 
    memory=memory,
    verbose=True
)

def handle_user_request(user_input: str) -> str:
    """
    Main routing logic. Passes the user request to the orchestrator,
    which automatically decides which agents (tools) to query and 
    synthesizes a final response.
    """
    try:
        response = orchestrator.run(input=user_input)
        return response
    except Exception as e:
        return f"Error processing request: {str(e)}"

# --- Example Usage ---
if __name__ == "__main__":
    print("=== EcoSphere AI Orchestrator ===")
    
    # Example: User uploads rice image + location
    # The orchestrator should route to CropDoctor AND Climate/Irrigation based on context
    sample_request = (
        "I just uploaded an image of my rice crop in Punjab. "
        "It looks a bit yellow. Also, should I water it today?"
    )
    
    print(f"User Request: {sample_request}\n")
    print("Orchestrator Processing...")
    
    # In a real environment, you need OPENAI_API_KEY set for this to execute
    if os.getenv("OPENAI_API_KEY"):
        final_answer = handle_user_request(sample_request)
        print("\n--- Final Response to Farmer ---")
        print(final_answer)
    else:
        print("\n[!] Please set OPENAI_API_KEY in your environment to see the live orchestrator output.")
