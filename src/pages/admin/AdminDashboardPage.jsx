import React from 'react';

// Material-UI Components
import { Typography, Button, TextField, MenuItem, Box, Grid, Paper } from '@mui/material';

// Material-UI Icons
import DateRangeIcon from '@mui/icons-material/DateRange';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Recharts Components
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

// Project Components
import DashboardLayoutComponent, {
    ExampleDashboardWidget,
    ExampleChartPlaceholder,
} from '../../components/layout/DashboardLayoutComponent';
import ResponsiveGridContainer from '../../components/common/ResponsiveGridContainer';

// Constants
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AdminDashboardPage = () => {
    const [dateRange, setDateRange] = React.useState('last_30_days');
    const [storeFilter, setStoreFilter] = React.useState('all');

    const handleDateRangeChange = (event) => {
        setDateRange(event.target.value);
        console.log('Date range changed to:', event.target.value);
    };

    const handleStoreFilterChange = (event) => {
        setStoreFilter(event.target.value);
        console.log('Store filter changed to:', event.target.value);
    };

    const handleExportSummary = () => {
        console.log('Export summary clicked');
    };

    const dashboardHeaderControls = (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', width: '100%' }}>
            <TextField
                select
                label="Date Range"
                value={dateRange}
                onChange={handleDateRangeChange}
                size="small"
                sx={{ minWidth: 180 }}
                InputProps={{ startAdornment: <DateRangeIcon sx={{ mr: 1, color: 'action.active' }} /> }}
            >
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="last_7_days">Last 7 Days</MenuItem>
                <MenuItem value="last_30_days">Last 30 Days</MenuItem>
                <MenuItem value="this_month">This Month</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
            </TextField>

            <TextField
                select
                label="Store"
                value={storeFilter}
                onChange={handleStoreFilterChange}
                size="small"
                sx={{ minWidth: 180 }}
                InputProps={{ startAdornment: <FilterListIcon sx={{ mr: 1, color: 'action.active' }} /> }}
            >
                <MenuItem value="all">All Stores</MenuItem>
                <MenuItem value="main">Main Store</MenuItem>
                <MenuItem value="downtown">Downtown</MenuItem>
                <MenuItem value="uptown">Uptown</MenuItem>
            </TextField>

            <Box sx={{ flexGrow: 1 }} />

            <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExportSummary}
                sx={{ ml: 'auto' }}
            >
                Export
            </Button>
        </Box>
    );

    // Sales data
    const salesData = [
        { name: 'Jan', sales: 100 },
        { name: 'Feb', sales: 120 },
        { name: 'Mar', sales: 140 },
        { name: 'Apr', sales: 160 },
        { name: 'May', sales: 180 },
        { name: 'Jun', sales: 200 },
    ];

    // Category data
    const categoryData = [
        { name: 'Category 1', value: 40 },
        { name: 'Category 2', value: 30 },
        { name: 'Category 3', value: 20 },
        { name: 'Category 4', value: 10 },
    ];

    // Revenue data
    const revenueData = [
        { name: 'Jan', revenue: 100, cost: 80 },
        { name: 'Feb', revenue: 120, cost: 100 },
        { name: 'Mar', revenue: 140, cost: 120 },
        { name: 'Apr', revenue: 160, cost: 140 },
        { name: 'May', revenue: 180, cost: 160 },
        { name: 'Jun', revenue: 200, cost: 180 },
    ];

    // Stats cards data
    const stats = [
        {
            title: 'Total Revenue',
            value: '$24,780',
            change: '+12%',
            trend: 'up',
            icon: <AttachMoneyIcon color="primary" sx={{ fontSize: 40 }} />
        },
        {
            title: 'Total Orders',
            value: '1,248',
            change: '+8%',
            trend: 'up',
            icon: <ShoppingCartIcon color="secondary" sx={{ fontSize: 40 }} />
        },
        {
            title: 'New Customers',
            value: '156',
            change: '+24%',
            trend: 'up',
            icon: <PeopleIcon color="success" sx={{ fontSize: 40 }} />
        },
        {
            title: 'Avg. Order Value',
            value: '$86.42',
            change: '+5%',
            trend: 'up',
            icon: <TrendingUpIcon color="warning" sx={{ fontSize: 40 }} />
        },
    ];

    return (
        <DashboardLayoutComponent
            title="Dashboard Overview"
            headerControls={dashboardHeaderControls}
            sx={{ p: 3 }}
        >
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                height: '100%',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                '&:hover': {
                                    boxShadow: 3,
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease-in-out',
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {stat.title}
                                </Typography>
                                <Box sx={{
                                    bgcolor: stat.trend === 'up' ? 'success.light' : 'error.light',
                                    p: 1,
                                    borderRadius: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    {stat.icon}
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant="h5" fontWeight={600}>
                                    {stat.value}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <TrendingUpIcon
                                        sx={{
                                            color: stat.trend === 'up' ? 'success.main' : 'error.main',
                                            fontSize: 16,
                                            mr: 0.5,
                                            transform: stat.trend === 'down' ? 'rotate(180deg)' : 'none'
                                        }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: stat.trend === 'up' ? 'success.main' : 'error.main',
                                            fontWeight: 500
                                        }}
                                    >
                                        {stat.change} from last month
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <ResponsiveGridContainer spacing={3}>
                {/* Sales Trend - Line Chart */}
                <Grid item xs={12} md={6}>
                    <ExampleDashboardWidget
                        title="Sales Overview"
                        sx={{ height: '100%', width: '100%' }}
                    >
                        <Box sx={{ height: 350, mt: 2 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="sales"
                                        name="Sales ($)"
                                        stroke="#1976d2"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </ExampleDashboardWidget>
                </Grid>

                {/* Top Categories - Pie Chart */}
                <Grid item xs={12} md={6}>
                    <ExampleDashboardWidget
                        title="Sales by Category"
                        sx={{ height: '100%', width: '100%' }}
                    >
                        <Box sx={{ height: 350, mt: 2 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        labelLine={false}
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value, name, props) => [
                                            `$${(value / 100 * 24780).toLocaleString()}`,
                                            props.payload.name
                                        ]}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </ExampleDashboardWidget>
                </Grid>

                {/* Recent Orders */}
                <Grid item xs={12} md={6}>
                    <ExampleDashboardWidget
                        title="Recent Orders"
                        sx={{ height: '100%', width: '100%' }}
                    >
                        <Box sx={{ maxHeight: 300, overflowY: 'auto', mt: 1 }}>
                            {[1, 2, 3, 4, 5].map((item) => (
                                <Box
                                    key={item}
                                    sx={{
                                        p: 2,
                                        mb: 1,
                                        borderRadius: 1,
                                        bgcolor: 'background.paper',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        '&:hover': {
                                            bgcolor: 'action.hover',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="subtitle2">Order #100{5 - item}</Typography>
                                        <Typography variant="caption" color="text.secondary">2{5 - item} min ago</Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        {item * 2} items • ${(item * 45.99).toFixed(2)}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </ExampleDashboardWidget>
                </Grid>

                {/* Top Products - Bar Chart */}
                <Grid item xs={12} md={6}>
                    <ExampleDashboardWidget
                        title="Top Selling Products"
                        sx={{ height: '100%', width: '100%' }}
                    >
                        <Box sx={{ height: 350, mt: 2 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={[
                                        { name: 'Organic Milk', sales: 400 },
                                        { name: 'Whole Wheat Bread', sales: 300 },
                                        { name: 'Free Range Eggs', sales: 250 },
                                        { name: 'Organic Apples', sales: 200 },
                                        { name: 'Greek Yogurt', sales: 180 },
                                    ]}
                                    layout="vertical"
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        width={120}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`${value} units`, 'Quantity Sold']}
                                    />
                                    <Bar
                                        dataKey="sales"
                                        name="Units Sold"
                                        fill="#4caf50"
                                        radius={[0, 4, 4, 0]}
                                    >
                                        {[0, 1, 2, 3, 4].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </ExampleDashboardWidget>
                </Grid>
            </ResponsiveGridContainer>
        </DashboardLayoutComponent>
    );
};

// Make sure AdminDashboardPage is the default export
export default AdminDashboardPage;