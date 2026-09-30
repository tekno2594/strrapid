export default async function handler(req, res) {

    try {

        const url = req.query.url;


        if (!url) {

            return res.status(400).json({
                error: "url parametresi gerekli"
            });

        }


        let target;

        try {

            target = new URL(url);

        } catch {

            return res.status(400).json({
                error: "Geçersiz URL"
            });

        }


        if (
            target.protocol !== "https:" &&
            target.protocol !== "http:"
        ) {

            return res.status(400).json({
                error: "Geçersiz protokol"
            });

        }


        /*
         * URL'nin HEAD bilgisini kontrol ediyoruz.
         */

        const response = await fetch(
            target.toString(),
            {
                method: "HEAD",
                redirect: "follow"
            }
        );


        if (!response.ok) {

            return res.status(
                response.status
            ).json({
                error:
                    "Kaynak sunucu HTTP " +
                    response.status +
                    " döndürdü"
            });

        }


        const contentType =
            response.headers.get(
                "content-type"
            ) || "application/octet-stream";


        /*
         * Browser'ın kaynağı doğrudan
         * oynatabilmesi için yönlendir.
         */

        res.setHeader(
            "Access-Control-Allow-Origin",
            "*"
        );


        res.setHeader(
            "Cache-Control",
            "public, max-age=300"
        );


        res.setHeader(
            "Content-Type",
            contentType
        );


        res.setHeader(
            "Location",
            response.url
        );


        return res.status(302).end();


    } catch (error) {

        console.error(error);


        return res.status(500).json({

            error:
                "Video kaynağı kontrol edilemedi."

        });

    }

}
