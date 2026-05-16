/**
 * AI Emergency Priority Matching Service
 * Ranks donors based on distance, availability, last donation, and historical response rate.
 */

export const rankDonors = (donors, recipientLocation, urgencyLevel = 'normal') => {
  return donors
    .map(donor => {
      let score = 0;

      // 1. Distance Calculation (Simulated for demo)
      const distance = calculateDistance(donor.location, recipientLocation);
      const distanceScore = Math.max(0, 100 - distance * 10); // 10 points off per km
      score += distanceScore * 0.4; // 40% weight

      // 2. Availability Status
      const availabilityScore = donor.status === 'Available' ? 100 : 0;
      score += availabilityScore * 0.25; // 25% weight

      // 3. Last Donation Date (Eligibility)
      const daysSinceDonation = getDaysSince(donor.lastDonationDate);
      const eligibilityScore = daysSinceDonation >= 90 ? 100 : (daysSinceDonation / 90) * 50;
      score += eligibilityScore * 0.15; // 15% weight

      // 4. Historical Response Rate
      const responseScore = donor.responseRate || 70;
      score += responseScore * 0.2; // 20% weight

      // Urgency Multiplier
      if (urgencyLevel === 'emergency') {
        score *= distance < 5 ? 1.2 : 1.0; // Boost nearby donors in emergencies
      }

      return {
        ...donor,
        matchScore: Math.round(score),
        distance: distance.toFixed(1),
        confidenceScore: Math.round(Math.min(100, score + (Math.random() * 5)))
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
};

const calculateDistance = (loc1, loc2) => {
  // Mock distance calculation
  // In real app, use Haversine formula with lat/lng
  return Math.random() * 15; // Returns 0-15 km
};

const getDaysSince = (dateString) => {
  if (!dateString) return 365;
  const lastDate = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today - lastDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
