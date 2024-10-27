import { NextResponse } from "next/server";
import { betContract } from "../../backend/contracts/bet-contract";

export default async function handler(req, res) {
    const { betName, optionADescription, optionBDescription } = req.body;

    try {
        const transaction = await betContract.createBet(betName, optionADescription, optionBDescription);
        const receipt = await transaction.wait();
        const betId = receipt.events[0].args.betId;

        res.status(200).json({ betId, message: "Aposta criada com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// To handle a POST request to /api/bet
export async function POST(req) {
    const { betName, optionADescription, optionBDescription } = req.body;

    try {
        const transaction = await betContract.createBet(betName, optionADescription, optionBDescription);
        const receipt = await transaction.wait();
        const betId = receipt.events[0].args.betId;

        return NextResponse.json({ betId, message: "Aposta criada com sucesso" }, {
            status: 200
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, {
            status: 500
        });
    }

}