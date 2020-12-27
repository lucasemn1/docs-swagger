import { model, Schema } from 'mongoose';

const ToDoSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    toDo: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    checkedDate: {
      type: Date,
    },
  },
  {
    collection: 'to_do',
    timestamps: true,
  }
);

export default model('ToDoModel', ToDoSchema);

