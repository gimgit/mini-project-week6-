// /api/projects/:projects_id/circles

router.get("/projects", async (req, res, next) => {
    // const user = req.body.userId
    try {
        const circles = await Project.find({userId : 'test2' }).sort("projects_Id");  

        res.json({ circles: circles });  
    } catch (err) {
        console.error(err);

        next(err);
    }
    });
