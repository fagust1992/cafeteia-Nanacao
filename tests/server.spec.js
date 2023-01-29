const request = require("supertest");
const server = require("../index");

describe("CRUD DE OPERACIONES DE CAFE ", () => {
  it("RECIBIENDO TIPOS DE CAFES", async () => {
    const respuesta = await request(server).get("/cafes").send();
    const status = respuesta.statusCode;
    expect(status).toBe(200);
    expect(respuesta.body).toBeInstanceOf(Array);
    expect(respuesta.body.length).toBeGreaterThanOrEqual(0);
  });

  it("debe devolver el status 400 cuando el café a eliminar  no exista", async () => {
    const jwt = "token";
    const eliminar_ID = 20;
    const respuesta = await request(server)
      .delete(`/cafes/${eliminar_ID}`)
      .set("Authorization", jwt)
      .send();
    const estatus = respuesta.statusCode;
    expect(estatus).toBe(404);
  });

  it("debeberia crear un nuevo café y devolver el status 201", async () => {
    const id = Math.floor(Math.random() * 999);
    const object_cafe = { id, nombre: "NUEVO CAFE" };
    const respuesta = await request(server).post("/cafes").send(object_cafe);
    const cafe_body = respuesta.body;
    const status = respuesta.statusCode;
    expect(cafe_body).toContainEqual(object_cafe);
    expect(status).toBe(201);
  });

  it("devuelve un estado 400 cuando el paylod es distinto que el parametro asignado en la ruta", async () => {
    const coffe_paylod = {
      id: 1,
      nombre: "miguel",
    };

    const respuesta = await request(server).put("/cafes/3").send(coffe_paylod);
    const estatus = respuesta.statusCode;
    expect(estatus).toBe(400);
  });
});
