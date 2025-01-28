killall -9 node
pnpm install 
nohup pnpm run start:dev  > server.log 2>&1 &