FROM dorowu/ubuntu-desktop-lxde-vnc:focal
RUN apt update -y
RUN apt upgrade -y
RUN apt install -y nano git
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
#RUN useradd sacha
RUN sudo apt-get install -y nodejs
RUN npm install --save-dev electron
RUN adduser sacha --disabled-password
RUN adduser sacha sudo
RUN echo '%sacha ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
