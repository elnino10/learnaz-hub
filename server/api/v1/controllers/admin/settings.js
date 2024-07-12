export const getSettings = async (req, res) => {
    try {
        res.status(200).json({ settings: "Settings data here" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export default getSettings;
