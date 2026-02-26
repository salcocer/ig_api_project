import { useEffect } from 'react';
import { useConversationDetails } from '@/store/useConversationDetails';

type MinimalConversation = { id: string };

export default function useKeysConversation(conversations: MinimalConversation[] = []) {
    const { selectedConversationId, setSelectedConversationId } = useConversationDetails();

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (!conversations || conversations.length === 0) return;

            const target = e.target as HTMLElement | null;
            const tag = target && target.tagName ? target.tagName.toLowerCase() : '';
            const isEditable =
                tag === 'input' ||
                tag === 'textarea' ||
                (target &&
                    target.getAttribute &&
                    target.getAttribute('contenteditable') === 'true');

            if (isEditable) return; // don't interfere when typing

            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const ids = conversations.map(c => c.id);
                const currentIndex = ids.indexOf(selectedConversationId || '');

                let nextIndex = 0;
                if (e.key === 'ArrowDown') {
                    nextIndex =
                        currentIndex === -1 ? 0 : Math.min(currentIndex + 1, ids.length - 1);
                } else {
                    nextIndex =
                        currentIndex === -1 ? ids.length - 1 : Math.max(currentIndex - 1, 0);
                }

                setSelectedConversationId(ids[nextIndex]);
            }
        }

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [conversations, selectedConversationId, setSelectedConversationId]);
}
