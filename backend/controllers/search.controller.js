import User from "../models/user.model.js";
import Match from "../models/match.model.js";

// Search players by skill/sport
export const searchPlayers = async (req, res) => {
    try {
        const { sport, skillLevel } = req.query; // ✅ match query param names exactly

        const query = {};

        // ✅ If both sport and skillLevel provided → match both in the same array element
        if (sport && skillLevel) {
            query.sportsInterests = {
                $elemMatch: {
                    sport: { $regex: `^${sport}$`, $options: "i" },
                    skillLevel: { $regex: `^${skillLevel}$`, $options: "i" }
                }
            };
        }
        // ✅ If only sport is provided
        else if (sport) {
            query["sportsInterests.sport"] = { $regex: `^${sport}$`, $options: "i" };
        }
        // ✅ If only skillLevel is provided
        else if (skillLevel) {
            query["sportsInterests.skillLevel"] = { $regex: `^${skillLevel}$`, $options: "i" };
        }

        const players = await User.find(query).select("-password");

        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({
            message: "Error searching players",
            error: error.message
        });
    }
};

// Search matches by sport/location/date
export const searchMatches = async (req, res) => {
    try {
        const { sport, lat, lng, radius, date } = req.query;
        const query = {};

        // Filter by sport (case-insensitive)
        if (sport) {
            query.sport = { $regex: sport, $options: "i" };
        }

        // Filter by date (exact match ignoring time)
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);

            query.date = { $gte: startOfDay, $lte: endOfDay };
        }

        // Geo filter (lat, lng, radius in meters)
        if (lat && lng && radius) {
            query.location = {
                $geoWithin: {
                    $centerSphere: [
                        [parseFloat(lng), parseFloat(lat)],
                        parseFloat(radius) / 6378137 // Earth's radius in meters
                    ]
                }
            };
        }

        const matches = await Match.find(query);
        res.status(200).json(matches);

    } catch (error) {
        res.status(500).json({ message: "Error searching matches", error: error.message });
    }
};
