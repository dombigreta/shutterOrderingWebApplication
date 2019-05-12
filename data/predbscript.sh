#!/bin/bash
mongo
use webtech
db.orders.remove({})
db.customers.remove({})
db.shutters.remove({})
db.parts.remove({})