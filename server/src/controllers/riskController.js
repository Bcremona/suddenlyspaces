export const getTenantRiskScore = (req, res) => {
  const riskScore = Math.floor(Math.random() * 101);
  res.json({ tenantRiskScore: riskScore });
};