import os
import onnx
import argparse
from flask import Flask, send_from_directory
from flask_cors import CORS


class ONNXVisualizer:
    def __init__(self, path) -> None:
        self.model = onnx.load(path)
        self.nodes, self.edges = [], []
        self.store = {}

        self._initStore()
        self._initNodes()
        self._initEdges()
    
    def _initStore(self):
        for idx, node in enumerate(self.model.graph.node):
            self.store[node.name] = f"node:{idx}"
            for output in node.output:
                self.store[output] = f"node:{idx}"
        
        for idx, initializer in enumerate(self.model.graph.initializer):
            self.store[initializer.name] = f"initializer:{idx}"
        
        for idx, inp in enumerate(self.model.graph.input):
            self.store[inp.name] = f"input:{idx}"
        
        for idx, out in enumerate(self.model.graph.output):
            self.store[out.name] = f"output:{idx}"
    
    def _initNodes(self):
        for idx, node in enumerate(self.model.graph.node):
            self.nodes.append({
                "id": f"node:{idx}",
                "name": node.name,
                "op": node.op_type
            })
        
        for idx, inp in enumerate(self.model.graph.input):
            self.nodes.append({
                "id": f"input:{idx}",
                "name": inp.name,
                "op": "Input"
            })
        
        for idx, out in enumerate(self.model.graph.output):
            self.nodes.append({
                "id": f"output:{idx}",
                "name": out.name,
                "op": "Output"
            })
    
    def _initEdges(self):
        _edges = set()
        for node in self.model.graph.node:
            for inp in node.input:
                if inp in self.store and "initializer" not in self.store[inp]:
                    _edges.add((self.store[inp], self.store[node.name]))


            for out in node.output:
                if out in self.store and "initializer" not in self.store[out] and "output" in self.store[out]:
                    _edges.add((self.store[node.name], self.store[out]))
        
        self.edges = list(_edges)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--onnx", "-o", help="Path to the onnx model")
    parser.add_argument("--port", "-p", default=8081, help="Port to start the server")

    args = parser.parse_args()
    model_path = args.onnx

    onnx_vis = ONNXVisualizer(model_path)

    app = Flask(__name__)

    ROOT_PATH = os.path.dirname(os.path.abspath(__file__))
    app.static_folder = os.path.join(ROOT_PATH, "static")
    CORS(app)

    @app.route("/")
    def getNodes():
        return {
            "nodes": onnx_vis.nodes,
            "edges": onnx_vis.edges
        } 

    @app.route("/edges")
    def getEdges():
        return onnx_vis.edges

    app.run(debug=True, port=args.port)

if __name__ == "__main__":
    main()