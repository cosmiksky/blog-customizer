import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

import clsx from 'clsx';
import { MouseEvent } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = (e: MouseEvent<HTMLDivElement>) => void;

type arrowButtonProps = {
	onClick: OnClick;
	isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: arrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={onClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
		</div>
	);
};
