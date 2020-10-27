 #!/bin/bash

source ~/.nvm/nvm.sh

nvm use 12.13.1
node -v

cd /root/jimmy-master
# # Install dependencies in production mode.
cd client
rm src/config.js
echo 'const SERVER_URL = "https://wiredclan.com";
const SERVER_PORT = "443";
const AVATAR_URL = "avatars.dicebear.com/api/bottts/";
export { SERVER_URL, SERVER_PORT, AVATAR_URL };' > src/config.js
echo "Installing FE dependencies..."
npm install
echo "Building FE..."
npm run build
echo "Restarting FE"
pm2 restart app.config.json

cd ../backend
echo "Installing BE dependencies..."
npm install
echo "Running migrations..."
sequelize db:migrate
echo "Restarting BE"
pm2 restart npm
echo "Done."

# # Location of our bare repository.
# GIT_DIR="/root/jimmy"

# # Where we want to copy our code.
# TARGET="/root/jimmy-master"

# while read oldrev newrev ref
# do

#     # Neat trick to get the branch name of the reference just pushed:
#     BRANCH=$(git rev-parse --symbolic --abbrev-ref $ref)

#     if [[ $BRANCH == "master" ]];
#     then
#         # Send a nice message to the machine pushing to this remote repository.
#         echo "Push received! Deploying branch: ${BRANCH}..."

#         # "Deploy" the branch we just pushed to a specific directory.
#         git --work-tree=$TARGET --git-dir=$GIT_DIR checkout -f $BRANCH

#         # Navigate to where my master code lives. 
#         cd /root/jimmy-master/backend
#         echo "Running deploy.sh..."
#         chmod 755 deploy.sh
#         ./deploy.sh

#         # cd /root/jimmy-master
#         # # # Install dependencies in production mode.
#         # cd client
#         # rm src/config.js
#         # echo 'const SERVER_URL = "http://nerdmonks.com";
#         # const SERVER_PORT = "8000";
#         # export { SERVER_URL, SERVER_PORT };' > src/config.js
#         # echo "Installing FE dependencies..."
#         # npm install
#         # echo "Building FE..."
#         # npm build

#         # cd ../backend
#         # echo "Installing BE dependencies..."
#         # npm install
#         # echo "Done."
#     else 
#         echo "Not master branch. Skipping."
#     fi
# done
