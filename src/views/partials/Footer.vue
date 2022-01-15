<template>
    <footer>
        <p>&copy; 2022 - Tout droits réservés</p>
        <p>Business Earns</p>
    </footer>
</template>

<style lang="scss">
footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;

  p:first-child {
    margin-top: 20px;
  }

  p {
    font-style: italic;
    font-weight: 600;
    font-size: .9rem;
  }
}
</style>