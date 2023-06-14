FROM debian AS development

ENV NODE_VERSION 19.8.1
ENV NVM_DIR /home/application/.nvm

RUN useradd -m application && \
    apt-get update && \
    apt-get install -y curl git && \
    apt-get clean && \
    su - application -c "touch /home/application/.bash_profile" && \
    su - application -c "curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash" && \
    su - application -c "echo [ -s "${NVM_DIR}/nvm.sh" ] && \. "${NVM_DIR}/nvm.sh"" && \
    su - application -c "echo [ -s "${NVM_DIR}/bash_completion" ] && \. "${NVM_DIR}/bash_completion"" && \
    su - application -c "nvm install ${NODE_VERSION}" && \
    su - application -c "nvm alias default ${NODE_VERSION}" && \
    su - application -c "nvm use default"

ENV NODE_PATH ${NVM_DIR}/v${NODE_VERSION}/lib/node_modules
ENV PATH ${NVM_DIR}/versions/node/v${NODE_VERSION}/bin:$PATH

LABEL description="NODE DOCKER DEV SERVER"
LABEL version="1.0"

USER application

WORKDIR /home/application

ENTRYPOINT [ "sleep" ]
CMD [ "infinity" ]
