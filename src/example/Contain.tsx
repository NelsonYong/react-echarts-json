import { ViewContainer } from '../packages'
import Demo from './/Demo'
import Demo1 from './Demo1'

import styles from './Contain.module.less'
import Demo2 from './Demo2'
import Map from './Map'
import Demo3 from './Demo3'
import Demo4 from './Demo4'
import Demo5 from './Demo5'

const Contain = () => {
	return (
		<div
			style={{
				backgroundColor: 'rgba(0,0,0,.8)',
				height: '100vh',
			}}
		>
			<div className={styles.header}>演示大屏案例</div>
			<div className={styles['screen-body']}>
				<div className={styles.left}>
					<Demo />
					<Demo1 />
					<Demo2 />
				</div>
				<div className={styles.middle}>
					<Map />
				</div>
				<div className={styles.right}>
					<Demo3 />
					<Demo4 />
					<Demo5 />
				</div>
			</div>

			<ViewContainer renderable={true}></ViewContainer>
		</div>
	)
}

export default Contain
