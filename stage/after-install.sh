source $HOME/.bash_profile
cd $HOME/concierge
npm install
npm install gulp -g
npm install pm2@latest -g
pm2 update
gulp no-watch
