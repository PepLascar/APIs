# RESP API Básica con métodos GET, POST, UPDATE, DELETE
# USANDO INSOMNIA para consultar el servidor local

from flask import Flask, jsonify, request    # método jsonify para convertir un objeto a json  request= hacer peticiones http
from productos import productos

app = Flask(__name__) # iniciando flask


@app.route('/ping') # Probando respuesta del servidor - La idea es que retorne un objeto json
def ping():
    return jsonify({"messege": "Holamundo"})


@app.route('/productos') #consultando objeto json con lista de productos
def getProductos():
    return jsonify({"Lista productos": productos})


# Método para obtener un índice de la lista del objeto json
@app.route('/productos/<string:nombre_producto>')
def getProducto(nombre_producto):
    encontrarProducto = [lista for lista in productos 
                                if lista['nombre'] == nombre_producto]
    if(len(encontrarProducto) > 0):  # Esto es para verificar si han habido coincidencias
        return jsonify({"Producto": encontrarProducto[0]})
    else:
        return jsonify({"Messege": "Producto no encontrado"})


# CRER DATOS CON EL MÉTODO POST
@app.route('/productos', methods=['POST'])
def addProducto():
    nuevo_producto = {
        "nombre": request.json["nombre"],
        "precio": request.json['precio'],
        "cantidad": request.json['cantidad']
    }
    productos.append(nuevo_producto)
    return jsonify({"messege": "Agregado exitosamente", "productos": productos})


# ACTUALIZAR
@app.route('/productos/<string:nombre_producto>', methods=['PUT'])
def aditProducto(nombre_producto):
    producto_encontrado = [ i for i in productos if i['nombre'] == nombre_producto] # quiero buscar productos que concidan con 'nombre' == nombre_producto, esto retorna una lista.
    if (len(producto_encontrado) > 0):
        producto_encontrado[0]['nombre']   = request.json['nombre']  # valor reemplazado por lo que se encuentre en el archivo json
        producto_encontrado[0]['precio']   = request.json['precio'] 
        producto_encontrado[0]['cantidad'] = request.json['cantidad']

        return jsonify({
            "mensaje": "Producto Actualizado",
            "producto": producto_encontrado[0]
        })

    else:
        return jsonify({ "mensaje": "Producto no encontrado" })

# ELIMINAR
@app.route('/productos/<string:nombre_producto>', methods=['DELETE'])
def eliminarProducto(nombre_producto):
    eliminar_producto = [ i for i in productos if i['nombre'] == nombre_producto  ]
    if len(eliminar_producto) > 0:
        productos.remove(eliminar_producto[0])

        return jsonify({
            "mensaje": "producto eliminado",
            "productos": productos
        })
    else:
        return jsonify({ "mensaje": "No se ha podido eliminar producto" })



# inicializando servidor...
if __name__ == '__main__':  
    app.run(debug=True, port=5000)
