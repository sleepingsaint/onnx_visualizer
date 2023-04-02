import os
from setuptools import setup, find_packages

def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name = "onnx_vis",
    version = "1.0.6",
    author = "sleepingsaint",
    author_email = "suryasantosh14523@gmail.com",
    description = ("This package help you visualize the ONNX model graph. Client-Server based architecture lets you share the model, using just a url instead of sharing the entire model."),
    license = "MIT",
    keywords = "example documentation tutorial",
    url = "https://github.com/sleepingsaint/onnx_visualizer",
    packages=['onnx_vis'],
    entry_points = {
        'console_scripts': [
            'onnx_vis=onnx_vis.onnx_vis:main'
        ]
    },
    include_package_data=True,
    package_data={
        "onnx_vis": ["onnx_vis/static/*"]
    },
    long_description=read('README.md'),
    long_description_content_type="text/markdown",
    classifiers=[
        # "Development Status :: 3 - Alpha",
        "Topic :: Utilities",
        "License :: OSI Approved :: MIT License",
    ],
)


