import os

folder_path = "D:\Documents\destiniesWeb\cards\items"
file_names = [os.path.splitext(f)[0] for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]

print(file_names)
