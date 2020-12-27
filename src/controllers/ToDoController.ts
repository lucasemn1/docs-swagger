import { Request, Response } from "express";
import ToDo from "../Models/ToDo";

export default class ToDoController {
  static async index(request: Request, response: Response): Promise<Response> {
    const { uid } = response.locals;

    const toDos = await ToDo.find({
      userId: uid,
    });

    return response.json(toDos);
  }

  static async store(request: Request, response: Response): Promise<Response> {
    const { uid } = response.locals;

    const data = await ToDo.create({
      userId: uid,
      toDo: request.body.toDo,
      checked: false,
    });

    return data
      .save()
      .then((toDo) => response.status(201).json(toDo))
      .catch(() => response.status(400).json());
  }

  static async find(request: Request, response: Response): Promise<Response> {
    const { uid } = response.locals;
    const { id } = request.params;

    return ToDo.find({
      _id: id,
      userId: uid,
    })
      .then((toDos) => response.json(toDos))
      .catch(() => response.json([]));
  }

  static async edit(request: Request, response: Response) {
    const { uid } = response.locals;
    const { id } = request.params;

    const dataToChange = {
      ...(request.body.toDo ? { toDo: request.body.toDo } : {}),
      ...(request.body.checked ? { checked: request.body.checked } : {}),
    };

    return ToDo.updateOne(
      {
        _id: id,
        userId: uid,
      },
      {
        $set: dataToChange,
      },
      (err) => {
        if (err) {
          return response.status(400).json();
        } else {
          return response.status(200).json();
        }
      }
    );
  }

  static async destroy(request: Request, response: Response) {
    const { uid } = response.locals;
    const { id } = request.params;

    return ToDo.deleteOne(
      {
        _id: id,
        userId: uid,
      },
      (err) => (err ? response.status(400).json() : response.status(200).json())
    );
  }
}
