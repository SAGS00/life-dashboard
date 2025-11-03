# Security

**Report security issues**: Use GitHub's [private security advisory feature](https://github.com/SAGS00/life-dashboard/security/advisories/new).

**Important**: This app stores data in browser localStorage (unencrypted). All data stays on your device.

## Security Notes

This is a client-side application where:

-   ✅ All data stays in your browser (localStorage)
-   ✅ No data is sent to external servers
-   ✅ No authentication required
-   ⚠️ Data is not encrypted in localStorage
-   ⚠️ Anyone with browser access can view the data

## Best Practices

1. Keep dependencies updated: `npm update`
2. Deploy with HTTPS in production
3. Don't commit `.env` files
 <!-- 4. Review the code before self-hosting -->

---

**Note**: This is a personal dashboard tool. For sensitive data, consider additional security measures.
