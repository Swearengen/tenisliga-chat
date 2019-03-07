import React from 'react'
import { observer } from 'mobx-react'

interface Props {
    usersWhoAreTyping: string[]
}

@observer
class TypingIndicator extends React.Component<Props> {
    render() {
        if (this.props.usersWhoAreTyping.length > 0) {
            return (
                <div>
                    {`${this.props.usersWhoAreTyping
                    .slice(0, 2)
                    .join(' and ')} is typing`}
                </div>
            )
        }
        return ''
    }
}

export default TypingIndicator
