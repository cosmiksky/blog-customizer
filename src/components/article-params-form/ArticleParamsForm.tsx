import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';

import { MouseEvent, useState, useRef, FormEvent } from 'react';
import { ArticleStateType, OptionType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import clsx from 'clsx';

type articleParamsFormProps = {
	setStatusPage: (state: ArticleStateType) => void
}

export const ArticleParamsForm = ({setStatusPage}: articleParamsFormProps) => {

	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef(null);
	const [edition, setEdition] = useState(defaultArticleState);

	const handleArrowClick = (e: MouseEvent) => {
		e.stopPropagation();
		setIsOpen(!isOpen)
	}

	const onSubmit = (evt: FormEvent) => {
		evt.preventDefault();
	};

	const handleResetPage = () => {
		setStatusPage(defaultArticleState);
	}

	const updateArticleState = (key: keyof ArticleStateType, option: OptionType) => {
		setEdition((prev) => ({
			...prev,
			[key]: option
		}))
	}

	useOutsideClickClose({isOpen, onClose: () => setIsOpen(false), rootRef, onChange: () => setIsOpen(false)})

	return (
		<>
			<ArrowButton onClick={handleArrowClick} isOpen={isOpen} />
			<aside ref={rootRef} className={clsx(styles.container, {[styles.container_open]: isOpen})}>
				<form className={styles.form} onSubmit={onSubmit} onReset={handleResetPage}>

					<Text weight={800} size={31} align='left' uppercase={true}>Задайте параметры</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={edition.fontFamilyOption}
						onChange={(option) => {
							updateArticleState('fontFamilyOption', option);
						}}
					/>
					<RadioGroup
						name='size_button'
						title='Размер шрифта'
						selected={edition.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => {
							updateArticleState('fontSizeOption', option);
						}}
					/>
					<Select
						title='Цвет шрифта'
						selected={edition.fontColor}
						options={fontColors}
						onChange={(option) => updateArticleState('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={edition.backgroundColor}
						options={backgroundColors}
						onChange={(option) => updateArticleState('backgroundColor', option)}
					/>
					<Select
						title='Ширина контента'
						selected={edition.contentWidth}
						options={contentWidthArr}
						onChange={(option) => updateArticleState('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={() => setEdition(defaultArticleState)} />
						<Button title='Применить' type='submit' onClick={() => setStatusPage(edition)} />
					</div>
				</form>
			</aside>
		</>
	);
};
