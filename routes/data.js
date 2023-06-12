const express = require("express");
const router = express.Router();
const Data = require("../models/Data");
router.post("/add-contest", async (req, res) => {
  const newData = new Data(req.body);
  console.log(req.body);
  console.log(newData);
  try {
    await newData.save();
    res.status(201).json({
      status: "Success",
      data: {
        data: newData,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

router.post("/verifycontest", async (req, res) => {
  console.log(req.body);
  const newCode = await Data.find({ code: req.body.code });
  try {
    if (newCode == "") {
      res.status(401).json({
        status: "Code not found",
      });
    } else {
      res.status(201).json({
        status: "Success",
        data: {
          code: newCode,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed to verify the contest.",
      message: err,
    });
  }
});
router.patch("/update-user/:id", async (req, res) => {
  try {
    const newData = await Data.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Updated",
      data: newData,
    });
  } catch (err) {
    res.status(500).json({
      status: "Got Error",
      error: err,
    });
  }
});
router.delete("/delete-contest", async (req, res) => {
  await Data.deleteOne(req.body);

  try {
    res.status(204).json({
      status: "Successfully deleted",
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed to delete the contest",
      message: err,
    });
  }
});

module.exports = router;
