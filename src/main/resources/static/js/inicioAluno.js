document.querySelectorAll('.side-list details').forEach((detail) => {
            detail.addEventListener('toggle', () => {
                if (detail.open) {
                    document.querySelectorAll('.side-list details').forEach((other) => {
                        if (other !== detail) {
                            other.open = false;
                        }
                    });
                }
            });
        });