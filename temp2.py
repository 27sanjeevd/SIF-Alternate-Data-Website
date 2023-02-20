import hashlib
import matplotlib.pyplot as plt
import numpy as np

# Define the data sources
data_sources = ['source1', 'source2', 'source3', 'source4']
num_sources = len(data_sources)

for i in range(num_sources):
    # Generate a unique hash for each number
    hash_object = hashlib.sha256(data_sources[i].encode())
    hex_dig = hash_object.hexdigest()
    # Convert the hash to an RGB color
    r, g, b = int(hex_dig[:2], 16), int(hex_dig[2:4], 16), int(hex_dig[4:6], 16)
    color_map = '#{:02x}{:02x}{:02x}'.format(r, g, b)
    print(color_map)
