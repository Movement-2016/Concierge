source $HOME/.bash_profile
cd $HOME/concierge
pm2 start -n concierge $HOME/concierge/dist/server/main.js
