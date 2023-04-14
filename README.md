# ONNX Visualizer

This package help you visualize the ONNX model graph. Client-Server based architecture lets you share the model, using just a url instead of sharing the entire model.

### Why not netron?

[Netron](https://github.com/lutzroeder/netron) is a viewer for neural network, deep learning and machine learning models. Netron also supports more formats than just ONNX. 

But the problem with netron, you can't visualize the models in remote / virtual machines environments, where most of the time GUI is not given. So the only way is you need to download and run the netron locally or use the web app, where model parsing happens in the web browser, which is super slow.

This package parses the onnx model and serves only required data, using the server-client model, which is highly bandwidth effecient.

## Usage

### Install

```
pip install onnx-vis
```

### Visualizing

Run the following command to visualize the model
``` bash
python3 -m onnx_vis <path to the onnx file> -p <port to run the server>

```

Example:

```bash
 python3 -m onnx_vis resnet18.onnx -p 63325
```
you can access the visualization on http://127.0.0.1:63325


## TODO

- [x] Make Visualization graph of ONNX Nodes
- [x] Add node attributes like kernels shape, bias shape to node metadata
- [ ] Add Sidebar to get more detailed information about nodes
- [ ] Add search and span to node feature
- [ ] Integrate Serveo.net to the codebase for creating public urls

## Contribution & Issues
Contirbution of any kind PR's, Discussions etc. is very much appreciated :). If you face any issues feel free to open a issue. 