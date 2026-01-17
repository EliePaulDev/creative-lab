from smolagents import tool

@tool
def save_file(data: str) -> None:
    """
    Save the data to a file
    
    Args:
        data: The data to save to the file
        
        
    """
    with open("investments.txt", "w") as f:
        f.write(data)