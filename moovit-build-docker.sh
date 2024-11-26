docker buildx build --platform linux/amd64 -t cto-label-studio .
# docker run -it -p 3030:8080 -v ~/Library/Application\ Support/label-studio:/label-studio/data moovit-label-studio
docker tag cto-label-studio 254431071183.dkr.ecr.eu-west-1.amazonaws.com/cto:cto-label-studio-latest
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 254431071183.dkr.ecr.eu-west-1.amazonaws.com
docker push 254431071183.dkr.ecr.eu-west-1.amazonaws.com/cto:cto-label-studio-latest