import hashlib
import matplotlib.pyplot as plt
import numpy as np

# Define the data sources
data_sources = ['source1', 'source2', 'source3', 'source4']
num_sources = len(data_sources)

# Generate a mapping of numbers to colors
color_map = {}
for i in range(1, num_sources+1):
    # Generate a unique hash for each number
    hash_object = hashlib.sha256(str(i).encode())
    hex_dig = hash_object.hexdigest()
    
    # Convert the hash to an RGB color
    r, g, b = int(hex_dig[:2], 16), int(hex_dig[2:4], 16), int(hex_dig[4:], 16)
    color_map[i] = '#{:02x}{:02x}{:02x}'.format(r, g, b)

# Generate some random data for each source
data = {}
for source in data_sources:
    data[source] = np.random.rand(10)

# Plot the data with the corresponding colors
for i, source in enumerate(data_sources):
    color = color_map[i+1]
    print(color)
