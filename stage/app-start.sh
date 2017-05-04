source $HOME/.bash_profile
cd $HOME/concierge
pm2 start $HOME/concierge/dist/server/main.js
