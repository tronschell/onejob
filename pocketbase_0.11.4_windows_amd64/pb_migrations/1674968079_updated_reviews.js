migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cd6r1x8p0abc53a")

  // remove
  collection.schema.removeField("hjjpdyzf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "loydhnxy",
    "name": "created_by",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cd6r1x8p0abc53a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hjjpdyzf",
    "name": "created_by",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("loydhnxy")

  return dao.saveCollection(collection)
})
