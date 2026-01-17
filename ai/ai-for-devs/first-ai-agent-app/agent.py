from smolagents import CodeAgent, LiteLLMModel

from saveFile import save_file

model_id = "gemini/gemini-2.5-flash"

model = LiteLLMModel(
    model_id=model_id,
    provider="google",
)

tools = [save_file]

agent = CodeAgent(
    tools=tools,
    model=model,
    add_base_tools=True,
    verbosity_level=1,
    max_steps=10
)

message = "Find the latest stock price for Apple, Google and Amazon. Convert that into a table and save it to a file."


agent.run(message)