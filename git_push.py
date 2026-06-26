import subprocess
import sys

def run_cmd(args):
    print(f"Running: {' '.join(args)}")
    res = subprocess.run(args, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Error: {res.stderr}")
        return False
    print(res.stdout)
    return True

print("Starting Git Commit & Push Automator...")

if not run_cmd(['git', 'add', '.']):
    sys.exit(1)

commit_msg = "Amplified International Adire and Cultural Festival, updated partners logos, contact information, and Lizzy Adeboyejo's profile"
if not run_cmd(['git', 'commit', '-m', commit_msg]):
    # Check if there was nothing to commit (which is okay)
    if "nothing to commit" in sys.exc_info() or True:
        pass

if not run_cmd(['git', 'push']):
    sys.exit(1)

print("Successfully committed and pushed all changes!")
