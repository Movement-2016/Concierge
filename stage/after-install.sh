source /home/ec2-user/.bash_profile
cd /home/ec2-user/concierge
mkdir node_modules || true
chmod 777 node_modules
npm install
npm install gulp -g
gulp no-watch
chmod 750 node_modules
