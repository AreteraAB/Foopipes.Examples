FROM aretera/contentaggregator

COPY . project

# Install the npm dependencies listed in package.json and compile typescript sources
RUN cd project && \
	npm install -g typescript && \
	npm install && \
	tsc
