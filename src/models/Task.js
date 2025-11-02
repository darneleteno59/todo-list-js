export class Task {
  constructor(id, description, completed, archived, priority) {
    this._createdAt = Date.now();
    this._updateAt = Date.now();
    this._id = id;
    this._description = description;
    this._completed = completed;
    this._archived = archived;
    this._priority = priority;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get completed() {
    return this._completed;
  }

  set completed(value) {
    this._completed = value;
  }

  get archived() {
    return this._archived;
  }

  set archived(value) {
    this._archived = value;
  }

  get priority() {
    return this._priority;
  }

  set priority(value) {
    this._priority = value;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(value) {
    this._createdAt = value;
  }

  get updateAt() {
    return this._updateAt;
  }

  set updateAt(value) {
    this._updateAt = value;
  }
}
