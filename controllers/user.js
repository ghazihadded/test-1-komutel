exports.calculeAge = async (req, res) => {
  const { year } = req.body;
  const aneeCurrent = await new Date().getFullYear();
  try {
    if (aneeCurrent < year) {
      return res.json({
        status: false,
        message: "on est en 2022 ,veuillez  vérifier votre année",
      });
    }
    const result = aneeCurrent - year + 1;
    return res.status(200).json({
      status: true,
      message: `votre age est ${result}`,
    });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
