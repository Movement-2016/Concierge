source /home/ec2-user/.bash_profile
cd /home/ec2-user/concierge
npm install
npm install gulp -g
npm install pm2 -g
pm2 update
gulp no-watch
