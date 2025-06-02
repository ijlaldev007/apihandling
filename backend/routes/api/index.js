import express from "express";
import productsRouter from "./products.js";
import hierarchicalRouter from "./hierarchical.js";
import timeSeriesRouter from "./time-series.js";
import geospatialRouter from "./geospatial.js";
import relationalRouter from "./relational.js";
import statisticsRouter from "./statistics.js";
import documentsRouter from "./documents.js";
import eventsRouter from "./events.js";
import docsRouter from "./docs.js";
import paymentsRouter from "./payments.js";

const router = express.Router();

// API documentation route
router.use("/", docsRouter);

// Mount all data type routers
router.use("/products", productsRouter);
router.use("/hierarchical", hierarchicalRouter);
router.use("/time-series", timeSeriesRouter);
router.use("/geospatial", geospatialRouter);
router.use("/relational", relationalRouter);
router.use("/statistics", statisticsRouter);
router.use("/documents", documentsRouter);
router.use("/events", eventsRouter);
router.use("/payments", paymentsRouter);

export default router;
