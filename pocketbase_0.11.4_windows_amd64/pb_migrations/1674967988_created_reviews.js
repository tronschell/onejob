migrate((db) => {
  const collection = new Collection({
    "id": "cd6r1x8p0abc53a",
    "created": "2023-01-29 04:53:08.709Z",
    "updated": "2023-01-29 04:53:08.709Z",
    "name": "reviews",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uhejgfiw",
        "name": "company_name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "j9wzi3qv",
        "name": "role_name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "bbdo0nil",
        "name": "pay",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "s6xb27gw",
        "name": "pay_rate",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Hourly",
            "Biweekly",
            "Monthly",
            "Annually",
            "Total"
          ]
        }
      },
      {
        "system": false,
        "id": "fdfwxrci",
        "name": "wlb_rating",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ]
        }
      },
      {
        "system": false,
        "id": "adm6lcrg",
        "name": "overall_rating",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ]
        }
      },
      {
        "system": false,
        "id": "zhlf8hd7",
        "name": "num_interviews",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "1",
            "2",
            "3",
            "4",
            ">4"
          ]
        }
      },
      {
        "system": false,
        "id": "s2ufoeof",
        "name": "work_location",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "In Person",
            "Remote",
            "Hybrid"
          ]
        }
      },
      {
        "system": false,
        "id": "kixsmyji",
        "name": "position_type",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Internship",
            "Co-op",
            "Full Time",
            "Contractor (temp)"
          ]
        }
      },
      {
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
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("cd6r1x8p0abc53a");

  return dao.deleteCollection(collection);
})
