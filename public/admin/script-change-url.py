import os

def replace_in_file(file_path, old_string, new_string):
    with open(file_path, 'r', encoding='utf-8') as file:
        file_data = file.read()
    
    if old_string in file_data:
        file_data = file_data.replace(old_string, new_string)
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(file_data)
        print(f'Replaced in {file_path}')
    else:
        print(f'No occurrences of {old_string} found in {file_path}')

def replace_in_js_files(root_dir, old_string, new_string):
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith('.js'):
                file_path = os.path.join(dirpath, filename)
                replace_in_file(file_path, old_string, new_string)

if __name__ == "__main__":
    root_directory = '.'  # Change this to your root directory
    # old_url = 'http://localhost:8080'
    # new_url = 'https://my-labelm.cz'
    old_url = 'https://my-labelm.cz'
    new_url = 'http://localhost:8080'
    replace_in_js_files(root_directory, old_url, new_url)
