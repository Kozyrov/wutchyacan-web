import { useState, useRef } from 'react';
import { CardType } from '../../shared/types/card.types';
import { v4 as uuidv4 } from 'uuid';
import styles from './inlineTemplate.module.scss';

type CardTemplateType = {
    addNewCardToDeck: (templateData: CardType) => void; 
}

const InlineCardTemplate = ({addNewCardToDeck}: CardTemplateType) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [validTitle, setValidTitle] = useState<boolean>(false);

    const titleRef = useRef<HTMLInputElement | null>(null);
    const descRef = useRef<HTMLDivElement | null>(null);

    const addCard = () => {
        if (titleRef.current?.textContent) {
            addNewCardToDeck({
                cardId: uuidv4(),
                title: titleRef.current?.textContent || "Title missing",
                description: descRef.current?.textContent
            });
            titleRef.current.textContent = "";
            if(descRef.current?.textContent) descRef.current.textContent = "";  
        }
        setValidTitle(false);
        titleRef.current?.focus();
    }

    return (
        <div className={styles.template_container}>
            {
                visible ? 
                <>
                    <div contentEditable className={styles.inline_input} ref={titleRef} placeholder="Card title" onInput={(e) => setValidTitle(!!e.currentTarget.textContent)}></div>
                    <div contentEditable className={`${styles.inline_input} ${styles.desc_input}`} ref={descRef} placeholder="Card description"></div>
                    <button disabled={!validTitle} onClick={addCard}>Add Card</button>
                    <button onClick={() => setVisible(false)}>Cancel</button>
                </> :
                <button onClick={() => setVisible(true)}>+ card</button>
            }
        </div>
    );
};

export default InlineCardTemplate;