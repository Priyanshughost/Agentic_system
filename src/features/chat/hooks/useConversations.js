import { useEffect } from "react";

import {
    getConversations,
} from "../services/conversationApi";

import {
    useChatStore,
} from "../store/chatStore";

export const useConversations =
    () => {

        const setConversations =
            useChatStore(
                (state) =>
                    state.setConversations
            );

        useEffect(() => {

            const load =
                async () => {

                    try {

                        const data =
                            await getConversations();

                        setConversations(
                            data
                        );

                    }
                    catch (error) {

                        console.error(
                            error
                        );

                    }
                };

            load();

        }, []);
    };