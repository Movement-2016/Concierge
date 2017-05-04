source $HOME/.bash_profile
cd $HOME/concierge
pm2 delete all || true
pm2 start -n mainapp $HOME/concierge/dist/server/main.js
